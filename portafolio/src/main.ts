import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

// Register TailwindPlus Elements web components (provides <el-*> elements)
import '@tailwindplus/elements';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
