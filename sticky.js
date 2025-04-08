function stickyelem(x = 0, y = 0, z = 1, id, setfn) {
	if(setfn == undefined){
		throw new Error("no function to set element content");
	}
	let elem = document.createElement('div');
	setfn(elem);

	let shown = false;
	let ismag = false;
	elem.style.position = 'fixed';
	elem.style.transformOrigin = 'left top 0px';
	let elobj = {
		x: x,
		y: y,
		z: z,
		el: elem,
		shown: shown,
		ismag: ismag
	};


	if(OWOP.stick == undefined){
		OWOP.stick = {};
	}
	if(OWOP.stick[id] != undefined){
		OWOP.stick[id].el?.remove();
	}
	OWOP.stick[id] = elobj;

	let move = function() {
		for(let i in OWOP.stick){
			let sc = OWOP.camera.zoom / 16 * OWOP.stick[i].z;
			let tx = ((-OWOP.camera.x +OWOP.stick[i].x) * OWOP.camera.zoom);
			let ty = ((-OWOP.camera.y +OWOP.stick[i].y) * OWOP.camera.zoom);
			if (tx > -(OWOP.stick[i].el.offsetHeight*OWOP.stick[i].z) * sc && ty > -(OWOP.stick[i].el.offsetWidth*OWOP.stick[i].z) * sc && tx < window.innerWidth && ty < window.innerHeight) {
				if (sc > 1.0 && !OWOP.stick[i].ismag) {
					OWOP.stick[i].ismag = true;
					OWOP.stick[i].el.style.imageRendering = 'pixelated';
				} else if (sc <= 1.0 && OWOP.stick[i].ismag) {
					OWOP.stick[i].ismag = false;
					OWOP.stick[i].el.style.imageRendering = 'auto';
				}

				OWOP.stick[i].el.style.transform ='matrix(' + sc + ',0,0,' + sc + ',' + Math.round(tx) + ',' + Math.round(ty) + ')';
				if (!OWOP.stick[i].shown) {
					OWOP.elements.viewport.appendChild(OWOP.stick[i].el);
					OWOP.stick[i].shown = true;
				}
			} else {
				if (OWOP.stick[i].shown) {
					OWOP.stick[i].el.remove();
					OWOP.stick[i].shown = false;
				}
			}
		}
	};
	if (!OWOP.util.stickymovadded) {
	OWOP.util.stickymovadded = true;
	OWOP.on(OWOP.events.camMoved, move);
	}
	move();

}

function addhovert(x, y, z, inner, id, prehover = "hover to view", closetitle = true){
	if(document.getElementById("hoverboxcss") == null){
	document.body.insertAdjacentHTML("beforeEnd", "<style>.hodiv {display: flex; flex-direction: column; min-height: 0; gap: 0; height: fit-content; width: fit-content; }.hidhed {overflow: hidden; text-align: center; max-height: 100vh; max-width: 100%; align-items: center; background-color: #aba389; transition: max-height 1s ease-in-out; }.donthidehed {overflow: hidden; max-height: 100vh; max-width: 100%; background-color: #aba389; align-items: center; }.unhidhed {overflow: hidden; max-height: 0px; max-width: max-content; background-color: #7e635c; transition: max-height 1s ease-in-out; }.hodiv:hover .hidhed {max-height: 0px; }.hodiv:hover .unhidhed {max-height: 100vh; }</style>")

	//i cannot be bothered doing this in js
	}
	if(inner == undefined) return;
	if(id == undefined){
		id = Math.random();
	}
	stickyelem(x, y, z, id, (t)=>{
		let maind = document.createElement("div");
		maind.classList.add("hodiv");

		let title = document.createElement("span");
		if(closetitle){
			title.classList.add("hidhed");
		} else {
			title.classList.add("donthidehed");
		} 
		title.innerHTML = prehover;

		let content = document.createElement("div");
		content.classList.add("unhidhed");
		content.appendChild(inner);
		
		maind.append(title, content);
		t.append(maind);
	});


}

if(!OWOP.util.addednotation){
OWOP.util.addednotation = true;
let intro = document.createElement("div");
let p1 = document.createElement("p");
let p2 = document.createElement("p");
let p3 = document.createElement("p");

p1.textContent = "hi, hello, this world has a"
p2.textContent = "few of these, just hover"
p3.textContent = "over them for more stuff"
intro.appendChild(p1);
intro.appendChild(p2);
intro.appendChild(p3);
addhovert(-9,22,1.5,intro,"intro","hover over me"); //note to self, dont do this lmao, slow as hell

let longexport = document.createElement("div");
longexport.innerHTML = "<p>this is a large export of main, scaled down</p><p>it goes all the way out to the world edge</p><p>bit of a pain to export and paste</p><p>might update it eventually</p>"
addhovert(992,-64,1.5,longexport,"longexport","large export of main");

let largekazki = document.createElement("div");
largekazki.innerHTML = '<p>large paste of a mangled kazki</p><p>not sure who edited her face but</p><p>i decided to keep it.</p><p>whats a kazki?</p><p>go play <a href="https://corru.observer">this</a> and find out :p</p>'
addhovert(452,65,2,largekazki,"largekazki","large kazki");

let density = document.createElement("div");
density.innerHTML = "<p>map of players, using data gathered over</p><p>about a year? or 2? i think?</p><p>idk i found the data in an old file i had</p><p>from an old version of my mod bot</p><p>downscaled 10x, center is spawn</p>"
addhovert(-272,832,2,density,"density","player map");

let thqarch = document.createElement("div");
thqarch.innerHTML = "<p>location of an old experiment i did on main</p><p>go there and see the archived versions</p><p>may or may not add some more later</p><p>we'll see :3</p>"
addhovert(-19,47,1.5,thqarch,"thqarch","3q archive");

let archone = document.createElement("div");
archone.innerHTML = "<p>\"voider's dream\"</p><p>the first 3rd quarter \"event\"</p><p>ripped directly from old archives where</p><p>limbo was wiped black</p><p>simplest of them all, might do again</p>";
addhovert(992,976,1.5,archone,"one","voider's dream");

let archtwo = document.createElement("div");
archtwo.innerHTML = "<p>\"16 color\"</p><p>the 2nd one, again, ripped from</p><p>old archives, less simple than a</p><p>simple black wipe. as you can see</p><p>people kept mixing the colors. annoying.</p>"
addhovert(2000,976,1.5,archtwo,"two","16 color");

let archthree = document.createElement("div");
archthree.innerHTML = "<p>\"primary\"</p><p>the third of the wipes</p><p>semi nice, people started using colors</p><p>as themes, as intended. however a bot that</p><p>i couldnt ban near the end messed stuff up</p><p>prob not doing this one again</p>"
addhovert(3008,976,1.5,archthree,"three","primary");

let archfour = document.createElement("div");
archfour.innerHTML = "<p>\"grid\"</p><p>the worst one</p><p>people kept deleting the grid</p><p>edge was protected to try and stop it</p><p>still did it. generally sucked</p><p>never repeating</p>"
addhovert(4016,976,1.5,archfour,"four","grid");

let archfive = document.createElement("div");
archfive.innerHTML = "<p>waters</p><p>currently the final one of the \"events\"</p><p>semi successful, people liked it</p><p>besides the one prick constanly pasting</p><p>omori on it, wiping a third of it</p><p>might do again</p>"
addhovert(5024,976,1.5,archfive,"five","water");
}
