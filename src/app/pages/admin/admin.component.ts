import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ProjectService } from '../../services/project.service';
import { Project, ProjectImage } from '../../models/project.model';
import { Observable, switchMap, of, tap, catchError } from 'rxjs';
import { DragDropModule, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Timestamp } from '@angular/fire/firestore';

@Component({
    selector: 'app-admin',
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule, DragDropModule],
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
    authService = inject(AuthService);
    projectService = inject(ProjectService);
    fb = inject(FormBuilder);

    user$ = this.authService.user$;
    projects: Project[] = [];
    projects$ = this.user$.pipe(
        switchMap(user => {
            console.log('Auth state update for admin:', user ? 'Logged In' : 'Logged Out');
            if (user) {
                return this.projectService.getAllProjects().pipe(
                    tap(projects => {
                        console.log('Admin projects loaded:', projects.length, projects);
                        this.projects = projects;
                    }),
                    catchError(err => {
                        console.error('Error loading projects in admin:', err);
                        return of([]);
                    })
                );
            } else {
                this.projects = [];
                return of([]);
            }
        })
    );

    // Login Form
    loginForm: FormGroup;

    // Project Form
    projectForm: FormGroup;
    isEditing = false; // true if editing, false if creating
    showForm = false; // Toggle between list and form
    isLoading = false;
    successMessage: string | null = null;

    // Image handling
    selectedCoverImage: File | null = null;
    selectedCoverPreview: string | null = null;
    selectedImages: File[] = [];
    selectedImagePreviews: string[] = [];
    existingImages: ProjectImage[] = [];

    constructor() {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });

        this.projectForm = this.fb.group({
            id: [''],
            title: ['', Validators.required],
            shortDescription: ['', Validators.required],
            fullDescription: ['', Validators.required],
            status: ['draft', Validators.required],
            featuredImageUrl: [''],
            showOnHomepage: [false]
        });
    }

    ngOnInit(): void {
    }

    // --- Auth Methods ---
    async onLogin() {
        if (this.loginForm.invalid) return;
        this.isLoading = true;
        try {
            const { email, password } = this.loginForm.value;
            await this.authService.login(email, password);
        } catch (error) {
            console.error('Login failed', error);
            alert('Login failed: ' + error);
        } finally {
            this.isLoading = false;
        }
    }

    async onLogout() {
        await this.authService.logout();
    }

    // --- Project CRUD ---

    startCreate() {
        this.isEditing = false;
        this.showForm = true;
        this.projectForm.reset({
            status: 'draft',
            showOnHomepage: false
        });
        this.existingImages = [];
        this.selectedImages = [];
        this.selectedImagePreviews = [];
        this.selectedCoverImage = null;
        this.selectedCoverPreview = null;
    }

    editProject(project: Project) {
        this.isEditing = true;
        this.showForm = true;
        this.projectForm.patchValue(project);
        this.existingImages = project.images || [];
        // Sort images by orderIndex if needed, though they should be stored sorted or sorted on fetch
        this.existingImages.sort((a, b) => a.orderIndex - b.orderIndex);
        this.selectedImages = [];
        this.selectedImagePreviews = [];
        this.selectedCoverImage = null;
        this.selectedCoverPreview = project.featuredImageUrl || null;
    }

    cancelEdit() {
        this.showForm = false;
        this.projectForm.reset();
        this.existingImages = [];
        this.selectedImages = [];
        this.selectedImagePreviews = [];
        this.selectedCoverImage = null;
        this.selectedCoverPreview = null;
    }

    async saveProject() {
        if (this.projectForm.invalid) return;
        this.isLoading = true;

        try {
            const formValue = this.projectForm.value;
            console.log('Admin: Saving project...', formValue.title);
            let featuredImageUrl = formValue.featuredImageUrl;

            // 1. Upload Cover Image if selected
            if (this.selectedCoverImage) {
                const path = `projects/covers/${Date.now()}_${this.selectedCoverImage.name}`;
                featuredImageUrl = await this.projectService.uploadImage(this.selectedCoverImage, path);
                console.log('Admin: New cover image uploaded:', featuredImageUrl);
            }

            const projectData: Partial<Project> = {
                title: formValue.title,
                shortDescription: formValue.shortDescription,
                fullDescription: formValue.fullDescription,
                status: formValue.status,
                featuredImageUrl: featuredImageUrl,
                showOnHomepage: formValue.showOnHomepage,
                updatedAt: Timestamp.now()
            };

            // Check if more than 4 projects are selected for homepage
            if (projectData.showOnHomepage) {
                // We need to fetch current count. Since projects$ is already available if we are logged in:
                // Actually, let's just do a quick check against the observable if possible, 
                // but since it's an observable we might want to just get the latest value.
                const currentHomepageProjects = this.projects.filter(p => p.showOnHomepage && p.id !== formValue.id);
                if (currentHomepageProjects.length >= 4) {
                    alert('You can only have 4 projects on the homepage. Please deselect another project first.');
                    this.isLoading = false;
                    return;
                }
            }

            // 2. Upload new gallery images
            const newuploadedImages: ProjectImage[] = [];
            if (this.selectedImages.length > 0) {
                console.log('Admin: Uploading gallery images...');
                for (const file of this.selectedImages) {
                    const path = `projects/gallery/${Date.now()}_${file.name}`;
                    const url = await this.projectService.uploadImage(file, path);
                    newuploadedImages.push({
                        imageUrl: url,
                        orderIndex: 0,
                        isFeatured: false
                    });
                }
            }

            // 3. Combine and Re-Index
            let allImages = [...this.existingImages, ...newuploadedImages];
            allImages = allImages.map((img, index) => ({
                ...img,
                orderIndex: index
            }));

            projectData.images = allImages;

            // Handle Featured Image
            // If we don't have a featuredImageUrl yet (no cover uploaded AND none in form),
            // and we have gallery images, we can pick the first one as a fallback.
            if (!projectData.featuredImageUrl && allImages.length > 0) {
                projectData.featuredImageUrl = allImages[0].imageUrl;
            }

            if (this.isEditing && formValue.id) {
                await this.projectService.updateProject(formValue.id, projectData);
            } else {
                await this.projectService.createProject(projectData);
            }

            this.showSuccessMessage('Project successfully uploaded!');
        } catch (error) {
            console.error('Error saving project', error);
            alert('Error saving project: ' + error);
        } finally {
            this.isLoading = false;
        }
    }

    async deleteProject(id: string) {
        if (!confirm('Are you sure you want to delete this project?')) return;
        try {
            await this.projectService.deleteProject(id);
        } catch (error) {
            console.error('Error deleting', error);
        }
    }

    // --- Image Handling ---

    onCoverFileSelected(event: any) {
        if (event.target.files && event.target.files.length > 0) {
            this.selectedCoverImage = event.target.files[0];
            const reader = new FileReader();
            reader.onload = (e: any) => {
                this.selectedCoverPreview = e.target.result;
            };
            reader.readAsDataURL(this.selectedCoverImage!);
        }
    }

    onFileSelected(event: any) {
        if (event.target.files && event.target.files.length > 0) {
            const newFiles = Array.from(event.target.files) as File[];
            const currentCount = this.selectedImagePreviews.length;

            this.selectedImages.push(...newFiles);
            // Reserve spots
            this.selectedImagePreviews.push(...new Array(newFiles.length).fill(''));

            newFiles.forEach((file, index) => {
                const reader = new FileReader();
                reader.onload = (e: any) => {
                    this.selectedImagePreviews[currentCount + index] = e.target.result;
                };
                reader.readAsDataURL(file);
            });
        }
    }

    async deleteImage(image: ProjectImage, index: number) {
        // If it's an existing image (has URL), delete from storage? 
        // Maybe not immediately, only on save? 
        // Or simpler: delete from array. If user saves, the array is updated. 
        // Unused images in storage is a cleanup problem for another day or use Cloud Functions.
        // However, if we want to be clean, we can delete immediately if confirmed.

        // For now, just remove from UI array.
        this.existingImages.splice(index, 1);

        // If the deleted image was featured, clear the featured flag/url
        if (image.isFeatured) {
            // logic to unset featured or pick new one
            const currentFeatured = this.projectForm.get('featuredImageUrl')?.value;
            if (currentFeatured === image.imageUrl) {
                this.projectForm.patchValue({ featuredImageUrl: '' });
            }
        }
    }

    removeSelectedImage(index: number) {
        this.selectedImages.splice(index, 1);
        this.selectedImagePreviews.splice(index, 1);
    }

    setFeatured(image: ProjectImage) {
        // Unset others
        this.existingImages.forEach(img => img.isFeatured = false);
        image.isFeatured = true;
        this.projectForm.patchValue({ featuredImageUrl: image.imageUrl });
    }

    drop(event: CdkDragDrop<ProjectImage[]>) {
        moveItemInArray(this.existingImages, event.previousIndex, event.currentIndex);
    }

    dropNew(event: CdkDragDrop<string[]>) {
        moveItemInArray(this.selectedImagePreviews, event.previousIndex, event.currentIndex);
        moveItemInArray(this.selectedImages, event.previousIndex, event.currentIndex);
    }

    showSuccessMessage(message: string) {
        this.cancelEdit();
        this.successMessage = message;
        setTimeout(() => {
            this.successMessage = null;
        }, 4000);
    }
}
