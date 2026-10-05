// Apps Script: Extensions → Apps Script → Deploy → Web app (Execute as: Me, Access: Anyone)
function doPost(e){
  const d=JSON.parse(e.postData.contents);          // {type:'Решения'|'Рефлексия', row:[...]}
  const ss=SpreadsheetApp.getActiveSpreadsheet();
  const sh=ss.getSheetByName(d.type)||ss.insertSheet(d.type);
  sh.appendRow([new Date()].concat(d.row));
  return ContentService.createTextOutput('ok');
}
function doGet(){
  const ss=SpreadsheetApp.getActiveSpreadsheet();
  const get=n=>{const s=ss.getSheetByName(n);return s?s.getDataRange().getValues().filter(r=>r[0]!==''):[]};
  return ContentService.createTextOutput(JSON.stringify({solutions:get('Решения'),reflection:get('Рефлексия')})).setMimeType(ContentService.MimeType.JSON);
}
