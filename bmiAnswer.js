module.exports = (index)=>{
  if(index < 16){
    return 'Выраженный дефицит массы тела'
  }
  if( index > 16 && index < 18.5){
    return 'Недостаточная (дефицит) масса тела'
  }
  if( index > 18.5 && index < 25){
    return 'Норма'
  }
  if( index > 25 && index < 35){
    return 'Избыточная масса тела (предожирение)'
  }
  if( index > 30 && index < 35){
    return 'Ожирение первой степени'
  }
  if( index > 35 && index < 40){
    return 'Ожирение второй степени'
  }

  if( index > 40){
    return 'Ожирение третьей степени (морбидное)'
  }
}