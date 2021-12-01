import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


  constructor(private http: HttpClient) { }
  url: string = "https://api.github.com/search/repositories?q=created:>2017-10-22&sort=stars&order=desc";
  reprositories: any = [];
  totalrepose: number = 0;
  page: number = 1;
  url1: string = this.url + '&page=';
  totalpages: number = 0;
  mydata: any = [];


  ngOnInit(): void {

//get data from first page api as defult in the begining of website
    this.http.get(this.url).subscribe(data => {
      this.reprositories = data;
    });
  }
//function called by pagechange event that get data from other api pages according to page number 
  getdata(event: any) {
    if (event == 1) {
      this.http.get(this.url).subscribe(data => {
        this.reprositories = data;
      });

    } else {

      this.http.get(this.url1 + event).subscribe(data => {
        this.reprositories = data;
      });
    }


  }
/*function to calculate time interval by day ,it recieve submit date in iso form ,convert it to simple form ,
calculate difference between it and current date and then calculate difference in days*/
  timeInterval(submitionDate: any) {
    let edit: any = new Date(submitionDate);
    let currentDate: any = new Date();
    let result = Math.floor((currentDate.getTime() - edit.getTime()) / (1000 * 60 * 60 * 24));
    return result;
  }

//function to extract owner name from full name 
  ownerName(fullName: string) {
    let edit = fullName.split('/');
    let name = edit[0];
    return name;
  }
  title = 'github-repose';
}
