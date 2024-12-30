import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PointageService } from '../services/pointage.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-modifier-pointage',
  templateUrl: './modifier-pointage.component.html',
  styleUrls: ['./modifier-pointage.component.css']
})
export class ModifierPointageComponent implements OnInit {
  pointageForm: FormGroup;
  pointageId: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pointageService: PointageService,
    private fb: FormBuilder
  ) {
    this.pointageId = this.route.snapshot.paramMap.get('id')!;
    this.pointageForm = this.fb.group({
      // Définit ici les champs du formulaire comme dans le formulaire d'ajout
    });
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}