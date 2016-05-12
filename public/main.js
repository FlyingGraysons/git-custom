$(function() {
	$('#reponame').keypress(function () {
		var str = $('#reponame').val();
		if(/^[a-zA-Z0-9-_]*$/.test(str) == false) {
			$('#reponame').css({'color' : 'red'})
		} else {
			$('#reponame').css({'color' : 'black'})
		}
	})

	$('#newRepo').click(function () {
		var reponame = $('#reponame').val();
		if (reponame === "") {
			alert("Failure, no repo name");
			return
		} else if (/^[a-zA-Z0-9-_]*$/.test(reponame) == false) {
			alert("Your search string contains illegal characters.");
			return
		}
		alert(reponame);
		data = {reponame: reponame}
		var request = $.ajax({
			method: "POST",
			data: data
		}).success(function (e) {
			alert(e);
		});
	})
})
