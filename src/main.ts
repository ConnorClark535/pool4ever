import { Component, OnInit } from '@angular/core';
import { SocialAuthService, GoogleLoginProvider } from 'angularx-social-login'; // For Google Login
import { NotificationService } from './notification.service'; // Notification Service
import { Store } from '@ngrx/store'; // If you're using NgRx for state management
import { environment } from '../environments/environment'; // For environment-specific settings

// Import PrimeNG Components
import { Button } from 'primeng/button';
import { Menu } from 'primeng/menu';
import { Card } from 'primeng/card';
import { Menubar } from 'primeng/menubar';
import { Ripple } from 'primeng/ripple';
import { ToggleButton } from 'primeng/togglebutton';
import { CascadeSelect } from 'primeng/cascadeselect';
import { Divider } from 'primeng/divider';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-app';
  darkMode = false; // Local dark mode state
  menuItems: any[]; // Menu items for PrimeMenu
  googleClientId = '945663563720-o7vik62t724s2mmedlgee1j3g79n887b.apps.googleusercontent.com'; // Your Google Client ID

  constructor(
    private authService: SocialAuthService, // For Google Login
    private notificationService: NotificationService, // Notification Service
    private store: Store // If using NgRx or store
  ) {}

  ngOnInit(): void {
    // Check and apply dark mode preference
    const darkMode = localStorage.getItem('darkMode');
    if (!darkMode || darkMode === 'enabled') {
      this.darkMode = true;
      document.documentElement.classList.add('my-app-dark');
      localStorage.setItem('darkMode', 'enabled');
    } else {
      this.darkMode = false;
      document.documentElement.classList.remove('my-app-dark');
    }

    // Sample menu items for PrimeNG Menu
    this.menuItems = [
      { label: 'Home', icon: 'pi pi-fw pi-home', routerLink: '/home' },
      { label: 'Settings', icon: 'pi pi-fw pi-cog', routerLink: '/settings' },
      { label: 'Profile', icon: 'pi pi-fw pi-user', routerLink: '/profile' }
    ];
  }

  // Google login handler
  loginWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(user => {
      console.log('Google User:', user);
      // Handle user information, save it to your store or process it
    });
  }

  // Show notification
  showNotification(type: string, title: string, text: string): void {
    this.notificationService.show({ type, title, text });
  }

  // Toggle dark mode
  toggleDarkMode(): void {
    this.darkMode = !this.darkMode;
    if (this.darkMode) {
      document.documentElement.classList.add('my-app-dark');
      localStorage.setItem('darkMode', 'enabled');
    } else {
      document.documentElement.classList.remove('my-app-dark');
      localStorage.setItem('darkMode', 'disabled');
    }
  }
}
