import { Component, OnInit } from '@angular/core';
import { Score } from '../interfaces/score';
import { Location, NgFor } from '@angular/common';
import { GraphModel } from '../interfaces/graph-model';
import { AlertComponent } from '../alert/alert/alert.component';
import { ScoreService } from '../services/score.service';
import { map } from 'rxjs';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-score',
  standalone: true,
  imports: [
    AlertComponent,
    NgFor
  ],
  templateUrl: './score.component.html',
  styleUrl: './score.component.css'
})
export class ScoreComponent implements OnInit {

  public MaxHeight = 160;

  // para mensajes de error
  options = {
    autoclose: false,
    keepAfterRouteChange: false
  };


  public scoreList: Score[] = [];
  /*
    {musicStyle: 'Rock', score: 50.0},
    {musicStyle: 'Pop', score: 12.5},
    {musicStyle: 'Clásica', score: 12.5},
    {musicStyle: 'Salsa', score: 25.0}
  ];
  */
  public colors: string[] = [
    '#498B94',
    '#F8C622',
    '#747474',
    '#EC972D',
  ];

  public graphModelList: GraphModel[] = new Array();

  public backgroudColor = '#498B94';

  constructor(
    private location: Location,
    private scoreService: ScoreService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {

    this.scoreService.getScore().subscribe(
      (scoreList: Score[]) => {
        this.scoreList = scoreList;


        let counter = 0;
        this.scoreList.forEach(score => {
          this.graphModelList.push({value: score.score * this.MaxHeight, color: this.colors.at(counter % this.colors.length), size: score.score + '%', legend: score.musicStyle} as GraphModel);
          counter = counter + 1;
        });

      },
      (error) => {
        // console.log('oops', error);
        // this.success = false;
        // this.errorMessage = error;
        // console.log("triggering error");
        this.alertService.error(error, this.options);
      }

    );


  }

  back() {
    this.location.back();
  }

}
