import { AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import { Component, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';import { map } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  courses: AngularFireList<any>;
  courses$: Observable<any[]>;
  course$;
  author$;
  courseSnapshot;
  // subscription: Subscription;

  constructor (public db: AngularFireDatabase) {
    this.courses = db.list('/courses')
    this.courses$ = this.courses.valueChanges();
    this.course$ = db.object('/courses/0').valueChanges();
    this.author$ = db.object('/authors/0').valueChanges();
    // console.log(this.courses$);

    this.courseSnapshot = this.courses.snapshotChanges().pipe(map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
    }));
  }
  //   this.subscription = db.list('/courses').valueChanges().subscribe(courses => {
  //       this.courses =  courses;
  //       console.log(courses);
  //     });
  // }

  // ngOnDestroy() {
  //   this.subscription.unsubscribe();
  // }
  
  add(course: HTMLInputElement) { 
    this.courses.push({ name: course });

    //noSql, can push complex object.
    // this.courses.push({
    //   name: course.value,
    //   price: 150,
    //   isLive: true,
    //   sections: [
    //     {title: "comp1"},
    //     {title: "comp2"},
    //     {title: "comp3"},
    //   ],
    //   });
    course.value = '';
  }

  update(key: string, course: string) { 
    this.courses.update(key, { name: course });
  }
  delete(key:string) {
    this.courses.remove(key);
  }
  deleteAll() {
    this.courses.remove();
  }
}
//https://github.com/angular/angularfire2/issues/1158
