import { AngularFireDatabase} from 'angularfire2/database';
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  courses$;
  course$;
  // subscription: Subscription;

  constructor (db: AngularFireDatabase) {
    this.courses$ = db.list('/courses').valueChanges();
    this.course$ = db.object('/courses/0').valueChanges();
  //   this.subscription = db.list('/courses').valueChanges().subscribe(courses => {
  //       this.courses =  courses;
  //       console.log(courses);
  //     });
  // }

  // ngOnDestroy() {
  //   this.subscription.unsubscribe();
  // }
}
