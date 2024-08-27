import { Component, OnInit } from '@angular/core';
import { EstiloMusical } from '../interfaces/estilo-musical';
import { Location, NgFor, NgIf } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmailValidatorService } from '../services/email-validator.service';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { SurveyService } from '../services/survey.service';
import { Survey } from '../interfaces/survey';
import { AlertComponent } from '../alert/alert/alert.component';
import { AlertService } from '../services/alert.service';
import { MusicStyleService } from '../services/music-style.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-survey',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    AlertComponent,
    NgFor,
    NgIf
  ],
  templateUrl: './survey.component.html',
  styleUrl: './survey.component.css'
})
export class SurveyComponent implements OnInit {

  surveyForm: FormGroup;

  // para mensajes de error via AlertService
  options = {
    autoclose: false,
    keepAfterRouteChange: false
  };


  public listaEstiloMusical: EstiloMusical[] = [];
  /*
    {idEstiloMusical: 1, estilo: 'Rock'},
    {idEstiloMusical: 2, estilo: 'Pop'},
    {idEstiloMusical: 3, estilo: 'Clásica'},
    {idEstiloMusical: 4, estilo: 'Salsa'}
  ];
  */
  constructor(
    private location: Location,
    private fb: FormBuilder,
    private surveyService: SurveyService,
    private musicStyleService: MusicStyleService,
    private emailValidatorService: EmailValidatorService,
    private alertService: AlertService,
    private router: Router
  ) {
    this.surveyForm = this.fb.group({
      musicStyle: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email],[this.emailValidatorService.checkEmail()]],
    });

  }



  /* emailAlreadyRegistered(control: AbstractControl): { [key: string]: boolean } | null {
    const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(control.value);
    return hasSpecialCharacter ? null : { noSpecialCharacter: true };
  } */




  ngOnInit(): void {
    this.musicStyleService.getAllEstiloMusical().subscribe(
      (estiloMusicalList: EstiloMusical[]) => {
        this.listaEstiloMusical = estiloMusicalList;
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

  onSubmit() {

    console.log('Form Submitted!', this.surveyForm.value);


    let survey: Survey = {} as Survey;


    // grabamos nueva survey
    survey.correo = this.surveyForm.controls['email'].value;
    survey.idEstiloMusical = this.surveyForm.controls['musicStyle'].value;

    this.surveyService.save(survey)
    .subscribe(
      // en data queda la nueva compania creada
      (data)=>{
        // success
        console.log('new survey created: '+data);

        this.router.navigate(['/score']);
      },
      (error: HttpErrorResponse) => {
        console.log('oops', error.message);
        // this.success = false;
        // this.errorMessage = error.message;
        // console.log("triggering error");
        this.alertService.error(error.message, this.options);

        //this.spinner.hide('sp3');
      }
    )

  }

}
