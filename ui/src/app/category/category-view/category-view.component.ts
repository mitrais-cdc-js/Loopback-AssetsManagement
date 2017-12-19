import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


// services
import { CategoryService } from '../../services/category.service';

// class
import { Category } from '../category';

@Component({
  selector: 'app-category-view',
  templateUrl: './category-view.component.html',
  styleUrls: ['./category-view.component.css']
})
export class CategoryViewComponent implements OnInit {
  category = new Category();
  parentName: string;
  constructor(private route: ActivatedRoute, private router: Router, private categoryService: CategoryService) { }

  ngOnInit() {
    console.log(this.category);
    this.getCategory(this.route.snapshot.params['id']);
    // this.getParentName(this.route.snapshot.params['id']);
  }

  getCategory(id){
		this.categoryService.getCategory(id)
			.then( category => {
				console.log(category);
        this.category = category;
        this.getParentName(this.category.parent_id);
			})
			.catch( e => console.log(e));
  }
  
  getParentName(id){
    this.categoryService.getCategoryById(id).subscribe(
        category => {
          console.log(category.name);
          this.parentName = category.name;
        }
    )
  }

}
