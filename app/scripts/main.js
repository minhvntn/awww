import "../styles/app.scss";

import App from "../../lib/app";
import "lazysizes/plugins/parent-fit/ls.parent-fit";
// import AOS from 'aos';

window.app = new App();

const arrayP = [""];

const arrayContent = ["@solatars satisfied with my efforts. I’ll return tomorrow to see what more is going on with #borgarmy!", "@solatars one of the coolest #borgarmy I’ve generated today.", "@solatars this is a lot of fun! This soldier is not joking... Looking like he's ready to command the #borgarmy", "It’s one of my favorite #borgarmy I’ve seen so far today @solatars", "Me sitting here in a few days, watching #solatars floor skyrocket @solatars", "This is way too fun, go finding some of your #borgarmy and recruit them! @solatars", "@solatars #borgarmy will take over the Solana NFT space", "@solatars #borgarmy 👀", "@solatars If I can mint him, I'm going to keep this #borgarmy forever", "@solatars #borgarmy The artwork is unmatched!", "@solatars #borgarmy Vector-based artwork is overlooked!", "In a few days, I'll be sitting here, watching the floor of #solatars skyrocket @solatars", "Generate some of your #borgarmy and recruit them, this is far too much fun! @solatars", "The Solana NFT space will be taken over by #borgarmy @solatars", "Vector-based artwork for the #borgarmy is underrated @solatars", "You guys aren't ready for @solatars #borgarmy", "People are sleeping on @solatars right now. It may change the future of #NFT on #solana"];

const html = document.querySelector('html');

const getOffset = (element, horizontal = false) => {
  if (!element) return 0;
  return getOffset(element.offsetParent, horizontal) + (horizontal ? element.offsetLeft : element.offsetTop);
};

app.ready(() => {
	html.classList.add('preload-transitions');
	// AOS.init();
	const header = document.querySelector('.header');
	window.addEventListener('scroll', () => {
		const windowScrollTop = window.pageYOffset || window.scrollY;
		if (windowScrollTop > 0) {
			header.classList.add("is-showing");
		} else {
			header.classList.remove("is-showing");
		}
  });

	//Fillter
	const allCardItem = document.querySelectorAll('.card--item');
	const cardWrapper = document.querySelector('.card');
	const inputSearch = document.querySelector('.form-search input');
	const noResultBlock = document.querySelector(".no-result");
	inputSearch.addEventListener("input", () => {
		let count = 0;
		const value = inputSearch.value;
		console.log(value);
		for (let i = 0; i< allCardItem.length; i++) {
			const item = allCardItem[i];
			const name = item.querySelector('.name');
			const nameText = name.textContent || name.innerText;
			if (nameText.toUpperCase().trim().indexOf(value.toUpperCase().trim()) > -1) {
				setTimeout(() => {
					item.style.display = "block";
				}, 200);
				item.classList.remove("hide");
				count++;
			} else {
				item.classList.add("hide");
				setTimeout(() => {
					item.style.display = "none";
				}, 350);
			}
		}
		if (!count) {
			noResultBlock.classList.remove("hide");
			cardWrapper.classList.add("hide");
		} else {
			noResultBlock.classList.add("hide");
			cardWrapper.classList.remove("hide");
		}
	});
	// Click to tweet 1
	const btnTweet = document.querySelectorAll('[data-btn-tweet]');
	btnTweet.forEach(node => {
		node.addEventListener('click', () => {
			var content = arrayContent[Math.floor(Math.random()*arrayContent.length)];
			var url=`\n \n${window.location.href}`;
			var text = `${content}`;
			window.open("http://twitter.com/share?url="+encodeURIComponent(url)+"&text="+encodeURIComponent(text));
		});
	});
	// Click to tweet 2
	const btnClaim = document.querySelectorAll('[data-btn-claim]');
	btnClaim.forEach(node => {
		node.addEventListener('click', () => {
			var content = arrayContent[Math.floor(Math.random()*arrayContent.length)];
			var url=`\n \n${window.location.href}`;
			var text = `${content}`;
			window.open("http://twitter.com/share?url="+encodeURIComponent(url)+"&text="+encodeURIComponent(text));
		});
	});
	// Click to tweet 3
	const btnKnow = document.querySelector('[data-btn-know]');
	btnKnow.addEventListener('click', () => {
		var content = arrayContent[Math.floor(Math.random()*arrayContent.length)];
		var url=`\n \n${window.location.href}`;
		var text = `${content}`;
		window.open("http://twitter.com/share?url="+encodeURIComponent(url)+"&text="+encodeURIComponent(text));
	});

});

app.load(() => {
	setTimeout(() => {
    const preloadTransitions = document.querySelector('.preload-transitions');
    if (preloadTransitions) preloadTransitions.classList.remove('preload-transitions');
  }, 500);
});