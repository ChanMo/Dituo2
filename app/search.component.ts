import { Component } from '@angular/core';
import { SearchBar } from 'ui/search-bar';

@Component({
  selector: 'search',
  templateUrl: 'search.component.html'
})

export class SearchComponent {
  public searchPhrase: string;
  public searchString: string;

  constructor(){}

  search(args) {
    let searchBar = <SearchBar>args.object;
    this.searchString = searchBar.text;
  }
}
