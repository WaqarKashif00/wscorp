import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from '../../components/hero/hero.component';
import { ServicesPreviewComponent } from '../../components/services/services.component';
import { ProjectsPreviewComponent } from '../../components/projects/projects.component';
import { ProcessComponent } from '../../components/process/process.component';
import { InsightsComponent } from '../../components/insights/insights.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeroComponent,
    ServicesPreviewComponent,
    ProjectsPreviewComponent,
    ProcessComponent,
    InsightsComponent
  ],
  templateUrl: './home.component.html'
})
export class HomeComponent { }