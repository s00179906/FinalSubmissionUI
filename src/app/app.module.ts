import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UploadComponent } from './components/upload/upload.component';
import { ModelcontentComponent } from './components/modelcontent/modelcontent.component';
import { PostsComponent } from './components/posts/posts.component';
import { PostDetailsComponent } from './pages/post-details/post-details.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PixbayPostsComponent } from './components/pixbayposts/pixbayposts.component';
import { HighlightDirective } from './directives/highlight.directive';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CategoriesComponent } from './components/categories/categories.component';
import { CategoryComponent } from './pages/category/category.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    routingComponents,
    UploadComponent,
    ModelcontentComponent,
    PostsComponent,
    PostDetailsComponent,
    PixbayPostsComponent,
    HighlightDirective,
    CategoriesComponent,
    CategoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    DragDropModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ModelcontentComponent]
})
export class AppModule {}
