
function mutSlider() {
	const wizeSlider = document.querySelectorAll('.wizeSlider');

	for (sldr = 0; sldr < wizeSlider.length; sldr++) {
	    let slides = wizeSlider[sldr].getAttribute('data-slides');
	    let inner = wizeSlider[sldr].querySelector('.wizeSlider-inner');
	    let item = wizeSlider[sldr].querySelectorAll('.wizeSlider-item');
	    let contentMaxSize = wizeSlider[sldr].getAttribute('data-maxSize');
	    let prevButton = wizeSlider[sldr].querySelector('.prev');
	    let nextButton = wizeSlider[sldr].querySelector('.next');
	    let sliderDelay = inner.getAttribute('data-delay');
	    //set slider delay
	    if (sliderDelay) {
	        inner.style.transition = 'transform '+sliderDelay;
	    }else{
	        inner.style.transition = 'transform 0.5s';
	    }
	    // set default contentMaxSize to (100px) if not defined
	    if (contentMaxSize == null) {
	        contentMaxSize = 100;
	    }
	    //set default slide number to (1) if not set
	    if (slides == null) {
	        slides = 1;
	    }
	    if (slides == 1) {
	        contentMaxSize = 0;
	    }
	    //Get slider container width
	    let wizeSliderWidth = wizeSlider[sldr].offsetWidth;
	    //Hide next button if there is no overflow content
	    if (inner.offsetWidth <= wizeSliderWidth) {
	        nextButton.classList.add('hide');
	    }
	    //determin the content Size 
	    //based on slider width devided by number defined slides
	    let contentSize = wizeSliderWidth/slides - 16;
	    //set width to given maxWidth before checking if content size
	    //is less than maxSize
	    let contentWidth = contentMaxSize;
	    //Set content Width to content size if
	    //Content size is greater than given maxSize
	    if (contentSize > contentMaxSize) {
	        contentWidth = contentSize;
	    }
	    // reset the content width if number of 
	    //content * contentwidth is biger than slider width

	    if (contentSize*contentWidth > wizeSliderWidth) {
	        let split = wizeSliderWidth/contentWidth;
	        let number = split.toString().split(".")[0];
	        contentWidth = wizeSliderWidth/number -16;
	    }
	    //Change the width of the slider item to the
	    //the new content width
	    for (i= 0; i < item.length; i++) {
	        item[i].style.width = contentWidth+'px'; 
	    }
	    //set next and prev event listeners for slider activation
	    let index = 0;
	    //Show next button if there is overflow content
	    if (inner.offsetWidth > wizeSliderWidth) {
	        nextButton.classList.remove('hide');
	    }
	    //slide elements onclik
	    nextButton.addEventListener('click',()=>{
	        index++;
	        prevButton.classList.add('show');
	        let amount = inner.offsetWidth - index * wizeSliderWidth;
	        let translate = index * wizeSliderWidth;
	        if (amount < wizeSliderWidth) {
	            translate = translate - contentWidth - 16;
	        }
	        inner.style.transform = 'translateX(-'+translate+'px)';
	        if (amount <= wizeSliderWidth) {
	            nextButton.classList.add('hide');
	        }
	    });
	    //slide back onclick
	    prevButton.addEventListener('click',()=>{
	        index--;
	        if (index <= 0) {
	            prevButton.classList.remove('show');
	        }
	        nextButton.classList.remove('hide');
	        inner.style.transform = 'translateX(-'+index * wizeSliderWidth+'px)';
	        let amount = inner.offsetWidth - index * wizeSliderWidth;
	        if (amount < wizeSliderWidth) {
	            nextButton.classList.add('hide');
	        }
	    })     
	}

}mutSlider();

window.addEventListener('resize', ()=>{
	mutSlider();
});
window.addEventListener('minimize', ()=>{
	mutSlider();
});

