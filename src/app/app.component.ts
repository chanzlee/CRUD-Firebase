import { AngularFireDatabase} from 'angularfire2/database';
import { Component, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  courses;
  courses$: Observable<{}[]>;
  course$;
  author$;
  // subscription: Subscription;

  constructor (db: AngularFireDatabase) {
    this.courses = db.list('/courses')
    this.courses$ = this.courses.valueChanges();
    this.course$ = db.object('/courses/0').valueChanges();
    this.author$ = db.object('/authors/0').valueChanges();
    console.log(this.courses$);
  //   this.subscription = db.list('/courses').valueChanges().subscribe(courses => {
  //       this.courses =  courses;
  //       console.log(courses);
  //     });
  // }

  // ngOnDestroy() {
  //   this.subscription.unsubscribe();
  // }
  }
  add(course: HTMLInputElement) { 
    // this.courses.push(course.value);

    //noSql, can push complex object.
    this.courses.push({
      name: course.value,
      price: 150,
      isLive: true,
      sections: [
        {title: "comp1"},
        {title: "comp2"},
        {title: "comp3"},
      ],
      });
    course.value = '';
  }
}

//https://github.com/angular/angularfire2/issues/1158
