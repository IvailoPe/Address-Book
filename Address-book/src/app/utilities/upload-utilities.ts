export function addLabelFucnt() {  // Добавяме фукнционалност за да можем да добавяме етикети
  const btnLabels = document.querySelector('#upload-details-labels button');
  const labelInput: HTMLInputElement = document.querySelector(
    '#upload-details-labels input'
  ) as HTMLInputElement;
  const labelColours = document.querySelectorAll('#color-box div');
  const labelBox = document.querySelector('#upload-details-labels-box');

  labelColours.forEach((element) => {
    element.addEventListener('click', () => {
      labelColours.forEach((element) => {
        element.classList.remove('selected-label');
      });
      element.classList.add('selected-label');
    });
  });

  btnLabels?.addEventListener('click', () => {
    if (labelInput?.value === '') {
      alert('Fill label input');
      return;
    }

    if(labelInput?.value.length > 10){
      alert('Label lenght must be below 10 characters');
      return;
    }

    let isColourSelected = false;
    let colour: string = '';

    for (const element of labelColours) {
      if (element.classList.contains('selected-label')) {
        isColourSelected = true;
        colour = element.getAttribute('data-color') as string;
        break;
      }
    }

    if (!isColourSelected) {
      alert('Choose label colour');
      return;
    }

    const label = document.createElement('div');
    label.classList.add('labels');
    label.textContent = labelInput?.value.trim();
    label.style.backgroundColor = colour;
    label.style.borderWidth = '0.2rem';
    label.style.borderStyle = 'solid';
    label.style.borderColor = colour;
    label.setAttribute('data-color', colour);

    label.addEventListener('mouseenter', () => {
      label.style.borderColor = 'black';
    });

    label.addEventListener('mouseleave', () => {
      label.style.borderColor = colour;
    });

    label.addEventListener('click', () => {
      let decision: boolean = confirm('Click ok to edit and cancel to delete');
      if (!decision) {
        label.remove();
      } else {
        labelInput.value = label.textContent as string;
        labelColours.forEach((element) => {
          element.classList.remove('selected-label');
        });
        for (const element of labelColours) {
          if (
            element.getAttribute('data-color') === label.style.backgroundColor
          ) {

            element.classList.add('selected-label');
          }
        }
        label.remove();
      }
    });

    labelBox?.appendChild(label);

    labelInput.value = '';
    labelColours.forEach((element) => {
      element.classList.remove('selected-label');
    });
  });
}

export function addCustomFieldFunct() {   // Добавяме фукнионалност за да можем да добавяме персонализирани полета
  let titleInput = document.querySelector('#title') as HTMLInputElement;
  let descriptionInput = document.querySelector(
    '#field-description'
  ) as HTMLInputElement;
  let customDescrBtn = document.querySelector(
    '#upload-details-custom-fields button'
  );
  let customDescrBox = document.querySelector(
    '#upload-details-custom-fields-box'
  );

  customDescrBtn?.addEventListener('click', () => {
    if (titleInput.value === '') {
      alert('Title is required');
      return;
    }
    if (descriptionInput.value === '') {
      alert('Description is required');
      return;
    }

    if (titleInput.value.length > 20) {
      alert('Title must be below 20 characters');
      return;
    }

    if (descriptionInput.value.length > 35) {
      alert('Description must be below 35 characters');
      return;
    }

    titleInput.value = titleInput.value.trim()
    descriptionInput.value = descriptionInput.value.trim();

    let div = document.createElement('div');

    div.innerHTML = `
        <h3 style="margin-top:0px;">${titleInput.value}</h3>
        <p>${descriptionInput.value}</p>
      `;

    div.classList.add('box-custom-field');

    div.addEventListener('mouseenter', () => {
      div.style.backgroundColor = 'red';
    });

    div.addEventListener('mouseleave', () => {
      div.style.backgroundColor = 'white';
    });

    div.addEventListener('click', () => {
      let decision: boolean = confirm('Click ok to edit and cancel to delete');
      if (!decision) {
        div.remove();
      } else {
        titleInput.value = div.querySelector('h3')?.textContent as string;
        descriptionInput.value = div.querySelector('p')?.textContent as string;
        div.remove();
      }
    });

    customDescrBox?.appendChild(div);

    titleInput.value = '';
    descriptionInput.value = '';
  });
}

// Не се използва никъде, беше опит 
export function addLabelFucntToAlreadyExistingLabels() {
  const Alllabels = document.querySelectorAll('#upload-details-labels-box div') as NodeListOf<HTMLElement>;

  const labelInput: HTMLInputElement = document.querySelector(
    '#upload-details-labels input'
  ) as HTMLInputElement;

  const labelColours = document.querySelectorAll('#color-box div');
  
  Alllabels.forEach((label) => {

    label.addEventListener('mouseenter', () => {
      label.style.borderColor = 'black';
    });

    label.addEventListener('mouseleave', () => {
      label.style.borderColor = label.style.backgroundColor;
    });


    label.addEventListener('click', () => {
        let decision: boolean = confirm('Click ok to edit and cancel to delete');
        if (!decision) {
          label.remove();
        } else {
          labelInput.value = label.textContent as string;
          labelColours.forEach((element) => {
            element.classList.remove('selected-label');
          });
          for (const element of labelColours) {
            if (
              element.getAttribute('data-color') === label.style.backgroundColor
            ) {
  
              element.classList.add('selected-label');
            }
          }
          label.remove();
        }
      });
  });
}
