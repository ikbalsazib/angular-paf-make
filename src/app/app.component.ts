import { Component } from '@angular/core';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import {environment} from '../environments/environment';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export interface ExperienceData {
  jobTitle: string;
  startDate: string;
  experience: number;
}

export interface Education {
  degree: string;
  college: string;
  passingYear: string;
  gpa: number;
}

export interface Person {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  fb: string;
  skills: string[];
  educationInstitute: string;
  passingYear: number;
  desc: string;
  experience: ExperienceData[];
  education: Education[];
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public person: Person = {
    _id: '1',
    name: 'Md Iqbal Hossen Sazib',
    address: 'Mirpur-10, Dhaka-1216',
    email: 'ikbal.sazib@gmail.com',
    phone: '+8801648879969',
    fb: 'https://web.facebook.com/ikbal.sazib',
    educationInstitute: 'Daffodil International University',
    passingYear: 2021,
    desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi, cum ea exercitationem laboriosam minima.',
    skills: ['Angular', 'React', 'NodeJS', 'Vue.js', 'MongoDB'],
    experience: [
      {jobTitle: 'Web Developer', experience: 4, startDate: '21-10-2015'},
      {jobTitle: 'App Developer', experience: 2, startDate: '21-10-2018'},
    ],
    education: [
      {degree: 'HSC', college: 'Agrani School & College', passingYear: '2016', gpa: 4.92},
      {degree: 'SSC', college: 'Ujalkhalshi High School', passingYear: '2013', gpa: 5.00}
    ]
  };


  constructor() {
    (window as any).pdfMake.vfs = pdfFonts.pdfMake.vfs;
  }

  /**
   * NEW CODE HERE
   */

  generateNewPdf(action = 'open') {
    console.log(pdfMake);
    const documentDefinition = this.getDocumentDefinitionForPdf();

    switch (action) {
      case 'open': pdfMake.createPdf(documentDefinition).open(); break;
      case 'print': pdfMake.createPdf(documentDefinition).print(); break;
      case 'download': pdfMake.createPdf(documentDefinition).download('Invoice.pdf'); break;

      default: pdfMake.createPdf(documentDefinition).open(); break;
    }

  }


  getDocumentDefinitionForPdf() {
    return {
      content: [
        {
          text: 'RESUME',
          bold: true,
          fontSize: 20,
          alignment: 'center',
          margin: [0, 0, 0, 20]
        },
        {
          columns: [
            [{
              text: this.person.name,
              style: 'name'
            },
              {
                text: this.person.address
              },
              {
                text: 'Email : ' + this.person.email,
              },
              {
                text: 'Contant No : ' + this.person.phone,
              },
              {
                text: 'Facebook: ' + 'Ikbal Sazib',
                link: this.person.fb,
                color: 'blue',
              }
            ],
            [
              this.getProfilePicObjectPdf()
            ]
          ]
        },
        {
          text: 'Skills',
          style: 'header'
        },
        {
          columns : [
            {
              ul : [
                ...this.person.skills.filter((value, index) => index % 3 === 0).map(s => s)
              ]
            },
            {
              ul : [
                ...this.person.skills.filter((value, index) => index % 3 === 1).map(s => s)
              ]
            },
            {
              ul : [
                ...this.person.skills.filter((value, index) => index % 3 === 2).map(s => s)
              ]
            }
          ]
        },
        {
          text: 'Experience',
          style: 'header'
        },
        this.getExperienceObjectPdf(this.person.experience),

        {
          text: 'Education',
          style: 'header'
        },
        this.getEducationObject(this.person.education),
        {
          text: 'Other Details',
          style: 'header'
        },
        {
          text: 'This is other details information\'s'
        },
        {
          text: 'Signature',
          style: 'sign'
        },
        {
          columns : [
            { qr: this.person.name + ', Contact No : ' + this.person.phone, fit : 100 },
            {
              text: `(${this.person.name})`,
              alignment: 'right',
            }
          ]
        }
      ],
      info: {
        title: this.person.name + '_RESUME',
        author: 'Softlab IT',
        subject: 'RESUME',
        keywords: 'RESUME, ONLINE RESUME',
      },
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 20, 0, 10],
          decoration: 'underline'
        },
        name: {
          fontSize: 16,
          bold: true
        },
        jobTitle: {
          fontSize: 14,
          bold: true,
          italics: true
        },
        sign: {
          margin: [0, 50, 0, 10],
          alignment: 'right',
          italics: true
        },
        tableHeader: {
          bold: true,
        }
      }
    };
  }


  getProfilePicObjectPdf() {
    return {
      image: environment.logoBase,
      width: 75,
      alignment : 'right'
    };
  }


  getExperienceObjectPdf(experiences: ExperienceData[]) {

    const exs = [];

    experiences.forEach(experience => {
      exs.push(
        [{
          columns: [
            [{
              text: experience.jobTitle,
              style: 'jobTitle'
            },
              {
                text: experience.jobTitle,
              },
              {
                text: experience.startDate,
              }],
            {
              text: 'Experience : ' + experience.experience + ' Months',
              alignment: 'right'
            }
          ]
        }]
      );
    });

    return {
      table: {
        widths: ['*'],
        body: [
          ...exs
        ]
      }
    };
  }

  getEducationObject(educations: Education[]) {
    return {
      table: {
        widths: ['*', '*', '*', '*'],
        body: [
          [{
            text: 'Degree',
            style: 'tableHeader'
          },
            {
              text: 'College',
              style: 'tableHeader'
            },
            {
              text: 'Passing Year',
              style: 'tableHeader'
            },
            {
              text: 'Result',
              style: 'tableHeader'
            },
          ],
          ...educations.map(ed => {
            return [ed.degree, ed.college, ed.passingYear, ed.gpa];
          })
        ]
      }
    };
  }


  /**
   * File to Base64
   * URL to Base64
   */

  urlToBase64(url: string) {
    let base64;

    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();

    xhr.addEventListener('load', () => {
      const reader = new FileReader();
      reader.readAsDataURL(xhr.response);
      reader.addEventListener('loadend', () => {
        base64 = reader.result;
        const imageBase64 = reader.result as string;
      });
    });

  }

  fileChanged(e) {
    const file = e.target.files[0];
    this.getBase64(file);
  }

  getBase64(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      console.log(reader.result);
      const res = reader.result as string;
    };
    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
  }

}
