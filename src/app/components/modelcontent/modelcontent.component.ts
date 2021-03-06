import { Component, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { PictresqueAPIService } from "src/app/services/pictresque-service/pictresque-api.service";
import Swal from "sweetalert2";
import { Store } from "@ngrx/store";
import {
  CreatePostAction,
  CreatePostSuccessAction
} from "src/app/state/pictresque.actions";
import { State } from "src/app/state/models/state.model";
import { Observable } from "rxjs";
import { ICategory } from "src/app/interfaces/ICategory";

@Component({
  selector: "app-modelcontent",
  templateUrl: "./modelcontent.component.html",
  styleUrls: ["./modelcontent.component.scss"]
})
export class ModelcontentComponent implements OnInit {
  imageUploaded: Boolean = false;
  fileToUpload: any;
  imageSrc: any;
  imageSelected: String = "";
  userFile: any;
  file: any;
  errorObservable$: Observable<Error>;
  categories: ICategory[];
  selectedCategory: String = "Categories";
  categoryId: string;
  $loading: Boolean;

  constructor(
    public activeModal: NgbActiveModal,
    private store: Store<State>,
    private pictrService: PictresqueAPIService
  ) {}

  setCategory(category: string, categoryId: string): void {
    this.categoryId = categoryId;
    this.selectedCategory = category;
  }

  getImage(files: FileList) {
    this.file = files;
    this.userFile = files[0];
    this.imageSelected = this.userFile.name;
    if (files && this.userFile) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageSrc = e.target.result;
      };
      reader.readAsDataURL(this.userFile);
      this.imageUploaded = true;
    }
  }

  createPost = async (title, desc) => {
    if (!title || !desc || this.selectedCategory == "Categories")
      return this.alert("Title, Description & Category is required!");

    if (!this.file) return this.alert("Oops, an image is required!");

    const post = {
      file: this.file,
      desc,
      title,
      category: this.categoryId
    };

    if (this.file && title && desc) {
      this.store.dispatch(new CreatePostAction(post));
      this.errorObservable$ = this.store.select(
        state => state.pictresque.error
      );
    }

    this.store.subscribe(state => (this.$loading = state.pictresque.loading));

    console.log(this.$loading);

    await this.errorObservable$.subscribe(error => {
      console.log("ERROR IN MODAL -->", error);
      if (error != undefined || error != null) {
        return this.alert(error.message);
      } else {
        return this.activeModal.dismiss();
      }
    });
  };

  alert(msg: string) {
    Swal.fire({
      position: "center",
      icon: "warning",
      title: msg,
      showConfirmButton: false,
      timer: 2000
    });
  }

  ngOnInit() {
    this.pictrService.getPostCategories().subscribe(categories => {
      this.categories = categories;
    });
  }
}
