// David Vesseur 10901272
window.onload = function(){

  queue()
  .defer(d3.json, "Data/NL-DR.json")
  .defer(d3.json, "Data/NL-FR.json")
  .defer(d3.json, "Data/NL-UT.json")
  .defer(d3.json, "Data/NL-FL.json")
  .defer(d3.json, "Data/NL-GE.json")
  .defer(d3.json, "Data/NL-GR.json")
  .defer(d3.json, "Data/NL-LI.json")
  .defer(d3.json, "Data/NL-NB.json")
  .defer(d3.json, "Data/NL-NH.json")
  .defer(d3.json, "Data/NL-OV.json")
  .defer(d3.json, "Data/NL-ZE.json")
  .defer(d3.json, "Data/NL-ZH.json")
  .await(makePage)

  function makePage(error, data1, data2, data3, data4, data5, data6, data7, data8, data9, data10, data11, data12){

  if (error) alert ("no data");
  awesome()
}
}
