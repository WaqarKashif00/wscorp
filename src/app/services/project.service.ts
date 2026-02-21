import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {
    Firestore,
    collection,
    addDoc,
    doc,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    collectionData,
    docData,
    Timestamp,
    onSnapshot,
    getDoc,
    getDocs
} from '@angular/fire/firestore';
import { Storage, ref, uploadBytes, getDownloadURL, deleteObject } from '@angular/fire/storage';
import { Observable, from, map, tap, of } from 'rxjs';
import { Project, ProjectImage } from '../models/project.model';

@Injectable({
    providedIn: 'root'
})
export class ProjectService {
    private firestore: Firestore = inject(Firestore);
    private storage: Storage = inject(Storage);
    private platformId = inject(PLATFORM_ID);
    private isBrowser = isPlatformBrowser(this.platformId);


    // Get all published projects for public view
    getPublishedProjects(): Observable<Project[]> {
        if (!this.isBrowser) return of([]);

        const col = collection(this.firestore, 'projects');
        const q = query(
            col,
            where('status', '==', 'published')
        );

        return new Observable<Project[]>(subscriber => {
            return onSnapshot(q, (snapshot) => {
                const projects = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as Project[];
                subscriber.next(projects);
            }, (error) => subscriber.error(error));
        }).pipe(
            tap(projects => console.log('ProjectService: Fetched public projects', projects)),
            map(projects => projects.sort((a, b) => {
                const dateA = a.createdAt?.toMillis ? a.createdAt.toMillis() : 0;
                const dateB = b.createdAt?.toMillis ? b.createdAt.toMillis() : 0;
                return dateB - dateA;
            }))
        );
    }

    // Get projects selected for the homepage (limit 4)
    getHomepageProjects(): Observable<Project[]> {
        if (!this.isBrowser) return of([]);

        const col = collection(this.firestore, 'projects');
        const q = query(
            col,
            where('showOnHomepage', '==', true),
            where('status', '==', 'published')
        );

        return new Observable<Project[]>(subscriber => {
            return onSnapshot(q, (snapshot) => {
                const projects = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as Project[];
                subscriber.next(projects.slice(0, 4));
            }, (error) => subscriber.error(error));
        }).pipe(
            tap(projects => console.log('ProjectService: Fetched homepage projects', projects))
        );
    }

    // Get all projects for admin view
    getAllProjects(): Observable<Project[]> {
        if (!this.isBrowser) return of([]);

        const col = collection(this.firestore, 'projects');
        return new Observable<Project[]>(subscriber => {
            return onSnapshot(col, (snapshot) => {
                const projects = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as Project[];
                subscriber.next(projects);
            }, (error) => subscriber.error(error));
        }).pipe(
            tap(projects => console.log('ProjectService: Fetched all projects (admin)', projects)),
            map(projects => projects.sort((a, b) => {
                const dateA = a.createdAt?.toMillis ? a.createdAt.toMillis() : 0;
                const dateB = b.createdAt?.toMillis ? b.createdAt.toMillis() : 0;
                return dateB - dateA;
            }))
        );
    }
    // Get single project details
    getProject(id: string): Observable<Project | undefined> {
        if (!this.isBrowser) return of(undefined);

        const docRef = doc(this.firestore, 'projects', id);
        return new Observable<Project | undefined>(subscriber => {
            return onSnapshot(docRef, (snapshot) => {
                if (snapshot.exists()) {
                    subscriber.next({ id: snapshot.id, ...snapshot.data() } as Project);
                } else {
                    subscriber.next(undefined);
                }
            }, (error) => subscriber.error(error));
        }).pipe(
            tap(project => console.log('ProjectService: Fetched single project', project))
        );
    }

    // Create new project
    async createProject(project: Partial<Project>): Promise<string> {
        const col = collection(this.firestore, 'projects');
        const docRef = await addDoc(col, {
            ...project,
            createdAt: Timestamp.now()
        });
        return docRef.id;
    }

    // Update project
    updateProject(id: string, data: Partial<Project>): Promise<void> {
        const docRef = doc(this.firestore, 'projects', id);
        return updateDoc(docRef, data);
    }

    // Delete project
    deleteProject(id: string): Promise<void> {
        const docRef = doc(this.firestore, 'projects', id);
        return deleteDoc(docRef);
    }

    // Image Management

    // Upload Image
    async uploadImage(file: File, path: string): Promise<string> {
        console.log('Starting image upload to path:', path);
        const storageRef = ref(this.storage, path);
        const result = await uploadBytes(storageRef, file);
        const url = await getDownloadURL(result.ref);
        console.log('Upload successful! Download URL:', url);
        return url;
    }

    // Delete Image
    deleteImage(url: string): Promise<void> {
        const storageRef = ref(this.storage, url);
        return deleteObject(storageRef);
    }

    // Subcollection for images logic
    getProjectImages(projectId: string): Observable<ProjectImage[]> {
        const imagesCollection = collection(this.firestore, `projects/${projectId}/images`);
        const q = query(imagesCollection, orderBy('orderIndex'));
        return new Observable<ProjectImage[]>(subscriber => {
            return onSnapshot(q, (snapshot) => {
                const images = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...(doc.data() as any)
                })) as ProjectImage[];
                subscriber.next(images);
            }, (error) => subscriber.error(error));
        });
    }

    async addProjectImage(projectId: string, image: ProjectImage): Promise<void> {
        const imagesCollection = collection(this.firestore, `projects/${projectId}/images`);
        await addDoc(imagesCollection, image);
    }

    async deleteProjectImage(projectId: string, imageId: string): Promise<void> {
        const docRef = doc(this.firestore, `projects/${projectId}/images`, imageId);
        await deleteDoc(docRef);
    }
}
