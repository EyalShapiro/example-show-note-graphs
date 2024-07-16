export function toolbarTaskCard() {
  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'], // toggled buttons

      [{ direction: 'rtl' }], // text direction

      [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
      [{ header: [1, 2, 3, 4, 5, 6, false] }],

      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],

      ['clean'], // remove formatting button
      [{ colorPicker: true }], // custom color picker
    ],
    //   history: {
    //     delay: 2000,
    //     maxStack: 500,
    //     userOnly: true,
    //   },
  }

  const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'check',
    'indent',
    'link',
    'image',
    'video',
    'color',
    'background',
    'align',
    'direction',
    'code-block',
    'script',
    'formula',
  ]
  return { formats, modules }
}