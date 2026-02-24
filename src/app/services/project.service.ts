import { Injectable, inject, NgZone } from '@angular/core';
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
    Timestamp,
    onSnapshot,
    getDoc,
    getDocs,
    setDoc
} from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { Storage, ref, uploadBytes, getDownloadURL, deleteObject } from '@angular/fire/storage';
import { Observable, from, map, tap, of, catchError } from 'rxjs';
import { Project, ProjectImage } from '../models/project.model';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ProjectService {
    private firestore: Firestore = inject(Firestore);
    private storage: Storage = inject(Storage);
    private auth: Auth = inject(Auth);
    private zone: NgZone = inject(NgZone);

    constructor() {
        console.log('ProjectService: Initialized');
    }

    // Get all published projects for public view (Real-time)
    getPublishedProjects(): Observable<Project[]> {
        const col = collection(this.firestore, 'projects');
        const q = query(col, where('status', '==', 'published'));

        return new Observable<Project[]>(subscriber => {
            return onSnapshot(q, (snapshot) => {
                const projects = snapshot.docs.map(d => ({ id: d.id, ...d.data() })) as Project[];
                const sorted = projects.sort((a, b) => {
                    const dateA = a.createdAt?.toMillis ? a.createdAt.toMillis() : 0;
                    const dateB = b.createdAt?.toMillis ? b.createdAt.toMillis() : 0;
                    return dateB - dateA;
                });
                console.log(`ProjectService: Sync complete. ${projects.length} published projects online.`);
                subscriber.next(sorted);
            }, (err) => {
                console.error('ProjectService ERROR (Public Sync):', err);
                subscriber.next([]);
            });
        });
    }

    // Get projects selected for the homepage (limit 4)
    getHomepageProjects(): Observable<Project[]> {
        const col = collection(this.firestore, 'projects');
        const q = query(
            col,
            where('showOnHomepage', '==', true),
            where('status', '==', 'published')
        );

        return new Observable<Project[]>(subscriber => {
            return onSnapshot(q, (snapshot) => {
                const projects = snapshot.docs.map(d => ({ id: d.id, ...d.data() })) as Project[];
                console.log(`ProjectService: Home sync complete. ${projects.length} featured projects.`);
                subscriber.next(projects.slice(0, 4));
            }, (err) => {
                console.error('ProjectService ERROR (Home Sync):', err);
                subscriber.next([]);
            });
        });
    }

    // Get all projects for admin view
    getAllProjects(): Observable<Project[]> {
        const col = collection(this.firestore, 'projects');
        return new Observable<Project[]>(subscriber => {
            return onSnapshot(col, (snapshot) => {
                const projects = snapshot.docs.map(d => ({ id: d.id, ...d.data() })) as Project[];
                subscriber.next(projects);
            }, (error) => {
                console.error('ProjectService ERROR (Admin Sync):', error);
                subscriber.error(error);
            });
        }).pipe(
            map(projects => projects.sort((a, b) => {
                const dateA = a.createdAt?.toMillis ? a.createdAt.toMillis() : 0;
                const dateB = b.createdAt?.toMillis ? b.createdAt.toMillis() : 0;
                return dateB - dateA;
            }))
        );
    }

    getProject(id: string): Observable<Project | undefined> {
        const docRef = doc(this.firestore, 'projects', id);
        return new Observable<Project | undefined>(subscriber => {
            return onSnapshot(docRef, (snapshot) => {
                if (snapshot.exists()) {
                    subscriber.next({ id: snapshot.id, ...snapshot.data() } as Project);
                } else {
                    subscriber.next(undefined);
                }
            }, (err) => {
                console.error(`ProjectService ERROR (Project Detail ${id}):`, err);
                subscriber.next(undefined);
            });
        });
    }

    async createProject(project: Partial<Project>): Promise<string> {
        console.log('ProjectService: Creating project in Firestore...', project.title);
        const col = collection(this.firestore, 'projects');
        const newDocRef = doc(col); // Generate ID locally first
        const data = {
            ...project,
            id: newDocRef.id,
            createdAt: Timestamp.now()
        };

        console.log('ProjectService: Attempting to save document ID:', newDocRef.id);

        // Add a 15-second timeout so it doesn't hang forever
        try {
            await this.zone.runOutsideAngular(() => setDoc(newDocRef, data));
            console.log('ProjectService: ✅ Project saved successfully!');
            return newDocRef.id;
        } catch (error) {
            console.error('ProjectService ERROR (createProject):', error);
            throw error;
        }
    }

    async updateProject(id: string, data: Partial<Project>): Promise<void> {
        console.log('ProjectService: Updating project in Firestore...', id);
        const docRef = doc(this.firestore, 'projects', id);

        try {
            await this.zone.runOutsideAngular(() => updateDoc(docRef, data));
            console.log('ProjectService: ✅ Project updated successfully!');
        } catch (error) {
            console.error('ProjectService ERROR (updateProject):', error);
            throw error;
        }
    }

    deleteProject(id: string): Promise<void> {
        const docRef = doc(this.firestore, 'projects', id);
        return deleteDoc(docRef);
    }

    async uploadImage(file: File, path: string): Promise<string> {
        console.log(`ProjectService: Uploading ${file.name} to ${path}...`);
        const storageRef = ref(this.storage, path);
        const result = await uploadBytes(storageRef, file);
        const url = await getDownloadURL(result.ref);
        console.log(`ProjectService: Uploaded ${file.name} -> ${url}`);
        return url;
    }

    deleteImage(url: string): Promise<void> {
        const storageRef = ref(this.storage, url);
        return deleteObject(storageRef);
    }

    getProjectImages(projectId: string): Observable<ProjectImage[]> {
        return this.getProject(projectId).pipe(
            map(project => project?.images || [])
        );
    }
}
