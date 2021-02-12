import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../model/Recipe';
import { Drug } from '../model/Drug';

@Injectable({
    providedIn: 'root'
})

export class AuthRecipeService {

    constructor(private http: HttpClient) {

    }

    getRecipes() {
        return this.http.get<Recipe[]>('http://localhost:8080/api/get-recipes');
    }

    getDrug(id) {
        return this.http.get<Drug>('http://localhost:8080/api/get-drug/' + id);
    }

    authRecipeService(recipe) {
        return this.http.post('http://localhost:8080/api/auth-recipe/' + sessionStorage.getItem("authenticatedUser"), recipe);
    }

    getRecipeDTO() {
        return this.http.get<Recipe[]>('http://localhost:8080//api/get-recipes-dto');
    }
}