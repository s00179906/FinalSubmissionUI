import { Component, OnInit } from "@angular/core";
import { PictresqueAPIService } from "src/app/services/pictresque-service/pictresque-api.service";
import { Router } from "@angular/router";
import { FacebookAuthService } from "src/app/services/facebook-service/facebook-auth.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
  display: Boolean = true;
  registerForm: FormGroup;
  loginForm: FormGroup;
  registerErrors: string;
  loginErrors: string;
  title = "FacebookLogin";
  loggedIn: any;
  user: any;

  constructor(
    private FBauthService: FacebookAuthService,
    private pictresqueAPI: PictresqueAPIService,
    private router: Router
  ) {}

  signInWithFacebook(): void {
    this.FBauthService.signInWithFB();
  }

  showSignin = () => {
    this.display = !this.display;
  };

  showSignup = () => {
    this.display = !this.display;
  };

  registerUser = () => {
    let canLogin = false;

    let email = this.registerForm.get("emailSignup").value;
    let password = this.registerForm.get("passwordSignup").value;

    console.log(email, password);

    this.pictresqueAPI.registerUser(email, password).subscribe(
      data => {
        console.log("success", data);
        canLogin = true;
        if (canLogin) {
          console.log("can login> ", canLogin);
          this.showSignin();
        }
      },
      error => {
        console.log(error.error.message), (this.registerErrors = error);
      }
    );
  };

  loginUser = () => {
    let email = this.loginForm.get("emailSignin").value;
    let password = this.loginForm.get("passwordSignin").value;

    this.pictresqueAPI.loginUser(email, password).subscribe(
      data => {
        const auth = {
          token: data["token"],
          id: data["_id"]
        };

        localStorage.setItem("auth", JSON.stringify(auth));
        localStorage.setItem("userLoggedIn", "true");
        this.router.navigate([""]);
      },
      error => {
        console.log(error.error.message), (this.loginErrors = error);
      }
    );
  };

  get emailSignup() {
    return this.registerForm.get("emailSignup");
  }

  get passwordSignup() {
    return this.registerForm.get("passwordSignup");
  }

  get emailSignin() {
    return this.loginForm.get("emailSignin");
  }

  get passwordSignin() {
    return this.loginForm.get("passwordSignin");
  }

  ngOnInit() {
    this.registerForm = new FormGroup({
      emailSignup: new FormControl(null, {
        updateOn: "blur",
        validators: [Validators.required, Validators.email]
      }),
      passwordSignup: new FormControl(null, {
        updateOn: "blur",
        validators: [Validators.required, Validators.minLength(6)]
      })
    });

    this.loginForm = new FormGroup({
      emailSignin: new FormControl(null, {
        updateOn: "blur",
        validators: [Validators.required, Validators.email]
      }),
      passwordSignin: new FormControl(null, {
        updateOn: "blur",
        validators: [Validators.required, Validators.minLength(6)]
      })
    });
  }
}
