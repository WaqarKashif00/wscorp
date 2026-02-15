import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProjectService } from '../../../services/project.service';
import { Project, ProjectImage } from '../../../models/project.model';
import { Observable, of } from 'rxjs';
import { switchMap, map, tap } from 'rxjs/operators';

@Component({
    selector: 'app-project-detail',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './project-detail.component.html',
    styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {
    private route = inject(ActivatedRoute);
    private projectService = inject(ProjectService);

    project$: Observable<Project | undefined>;

    // Lightbox
    lightboxOpen = false;
    currentImageIndex = 0;
    images: ProjectImage[] = [];

    constructor() {
        this.project$ = this.route.paramMap.pipe(
            switchMap(params => {
                const id = params.get('id');
                if (id) {
                    return this.projectService.getProject(id).pipe(
                        tap(project => {
                            if (project && project.images) {
                                // Start with featured image if available, else first?
                                // Actually, the requirements say "First image = Featured image (highlighted)" 
                                // But in Admin we allow setting featured explicitly.
                                // Let's just use the images array which is sorted by orderIndex.
                                this.images = project.images.sort((a, b) => a.orderIndex - b.orderIndex);
                            }
                        })
                    );
                }
                return of(undefined);
            })
        );
    }

    ngOnInit(): void { }

    openLightbox(index: number) {
        this.currentImageIndex = index;
        this.lightboxOpen = true;
    }

    closeLightbox() {
        this.lightboxOpen = false;
    }

    nextImage(event?: Event) {
        event?.stopPropagation();
        if (this.currentImageIndex < this.images.length - 1) {
            this.currentImageIndex++;
        } else {
            this.currentImageIndex = 0;
        }
    }

    prevImage(event?: Event) {
        event?.stopPropagation();
        if (this.currentImageIndex > 0) {
            this.currentImageIndex--;
        } else {
            this.currentImageIndex = this.images.length - 1;
        }
    }
}
