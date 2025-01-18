import { FormControl } from '@angular/forms';
export interface AddProject {
  name: FormControl<string>;
  teamId: FormControl<string>;
  imageUrl: FormControl<string>;
}
