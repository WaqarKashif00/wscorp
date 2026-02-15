import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, take, tap } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    return authService.user$.pipe(
        take(1),
        map(user => !!user),
        tap(loggedIn => {
            if (!loggedIn) {
                // Optional: Redirect to login page if you have a dedicated one, 
                // but for now the admin page handles login itself if unauthenticated, scheme-wise.
                // However, usually a guard prevents access entirely. 
                // Given the instructions say "Only authorized users can access admin dashboard",
                // we might want the admin component to handle the "Show Login" state if user is null, 
                // OR we redirect to a login route. 
                // Let's assume the Admin Component handles both states (Login vs Dashboard) for simplicity 
                // unless a separate login route is preferred.
                // BUT, a Guard typically blocks navigation.
                // Let's make the guard redirect to home or return false if we want strict blocking.
                // Re-reading requirements: "Route: /admin ... Authentication ... Email/password login". 
                // It implies the /admin route might contain the login form too.
                // So maybe we DON'T need a guard on the /admin route itself if it serves as the login page?
                // Or we have /admin/login and /admin/dashboard.
                // Let's stick to a single /admin route that shows Login if not auth, and Dashboard if auth.
                // In that case, we don't strictly *need* a CanActivate guard on /admin itself, 
                // but we might want one to protect child routes if we had them.
                // For now, I will implement it but maybe not attach it to /admin yet 
                // if /admin is the entry point for login.
            }
        })
    );
};
