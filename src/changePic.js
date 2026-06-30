import background1 from './pic/1.png';
import background2 from './pic/2.jpeg';
import background3 from './pic/3.jpeg';
import background4 from './pic/4.jpeg';
import background5 from './pic/5.jpeg';

const picArray = [background1, background2, background3, background4, background5];
const mainArea = document.querySelector('.main');

function changePic() {
    const dice = Math.floor(Math.random() * 5);
    const picSelected = picArray[dice];
    mainArea.style.backgroundImage = `url('${picSelected}')`; 
}

export {changePic};