import { Component, OnInit } from '@angular/core';
import { Recipe } from '../model/Recipe';
import { AuthRecipeService } from '../service/auth-recipe.service';
import { Drug } from '../model/Drug';
import { AppointmentReportService } from '../service/appointment-report.service';
import { Observable, Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-auth-recipe',
  templateUrl: './auth-recipe.component.html',
  styleUrls: ['./auth-recipe.component.css']
})
export class AuthRecipeComponent implements OnInit {
  recipes: Recipe[] = [];
  drug: Drug = new Drug();
  drugs: Drug[] = [];
  everySecond: Observable<number> = timer(0, 1000);
  private subscription: Subscription;
  constructor(private service: AuthRecipeService) { }

  ngOnInit() {
    this.subscription = this.everySecond.subscribe((seconds) => {
      this.getRecipesDTO();
    })
  }

  authRecipe(recipe) {
    this.service.authRecipeService(recipe).subscribe(
      (result) => {
        alert("Uspešno overen recept!");
        this.getRecipesDTO();
      },
      error => {
        alert("Recept je upravo overila druga sestra!");
      })
  }

  getRecipesDTO() {
    this.service.getRecipeDTO().subscribe(
      data => {
        this.recipes = data;
        console.log(this.recipes);
      },
      error => {
        console.log(error);
      })
  }
  getRecipes() {
    this.service.getRecipes().subscribe(
      data => {
        this.recipes = data;
        console.log(this.recipes);
      },
      error => {
        console.log(error);
      }
    )
  }
}
