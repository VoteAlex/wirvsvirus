import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div style="text-align:center" class="content">
      <h1>
        Welcome to {{title}}!
      </h1>
      <img width="300" alt="Angular Logo" src="https://wirvsvirushackathon.org/wp-content/uploads/2020/03/Hackathon_slogan_wei%C3%9F.png">
    </div>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {
  title = 'wirvsvirus-spa';
}
