
var DtView = function(document, write, value) {

	var tagIn;

	// create a "write" vs a "read" dt based on flag in constructor
	if (write) {
		tagIn = document.createElement("input");
		tagIn.className = "dt-w";
		if (!value) {
			tagIn.value = "How much time?";
		} else {
			tagIn.value = value;
		}
	} else {
		tagIn = document.createElement("span");
		tagIn.className = "dt-r";
		tagIn.innerHTML = value;
	}

	tagIn.write = write;

	var writeDtOnBlur = function(el) {
		console.log("writeDtOnBlur");
		if (el.validTime()) {
			el.parentNode.commitDt(el);

			// create a read Dt
			var timeTag = new DtView(document, false, el.value);

			// if this Dt is the only child, append a new Time to the list
			if (el.parentNode.children.length === 1) {
				var timeList = document.getElementById("time-list");
				timeList.appendChild(new TimeView(document));
			}
			// replace the current write Dt with the new read Dr
			el.parentNode.replaceChild(timeTag, el);
		} else {
			if (el.value !== "How much time?") {
				alert("Please enter time in the format hh:mm.");
			}
			if (el.parentNode.children.length === 1) {
				el.parentNode.removeDt(el);
			}

		}
	};

	var startEditOnClick = function(el) {
		var tagIn = new DtView(document, true, el.innerHTML);
		el.parentNode.replaceChild(tagIn, el);
		tagIn.focus();
	};


	tagIn.onblur = function() {
		if (this.write) {
			writeDtOnBlur(this);
		}
	};

	tagIn.onclick = function() {
		if (!this.write) {
			startEditOnClick(this);
		}
		window.event.stopPropagation();
	};

	tagIn.validTime = function() {
		var r = /^[0-9]?[0-9]:[0-9][0-9]$/;
		return r.test(this.value);
	};

	return tagIn;

}