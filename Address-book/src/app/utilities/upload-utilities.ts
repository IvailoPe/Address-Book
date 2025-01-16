export function addLabelFucnt() {
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
      console.log(labelInput.value);
      alert('Fill label input');
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
    label.textContent = labelInput?.value;
    label.style.backgroundColor = colour;
    label.style.borderWidth = '0.2rem';
    label.style.borderStyle = 'solid';
    label.style.borderColor = colour;
    label.setAttribute("data-color",colour);

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
            console.log(element.getAttribute('data-color'));
            console.log(label.style.backgroundColor);

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

export function addCustomFieldFunct(){
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
        let decision: boolean = confirm(
          'Click ok to edit and cancel to delete'
        );
        if (!decision) {
          div.remove();
        } else {
          titleInput.value = div.querySelector('h3')?.textContent as string;
          descriptionInput.value = div.querySelector('p')
            ?.textContent as string;
          div.remove();
        }
      });

      customDescrBox?.appendChild(div);

      titleInput.value = '';
      descriptionInput.value = '';
    });
}