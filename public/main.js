$(function() {
	$('#newRepo').click(function () {
		var reponame = $('#reponame').val();
		if (reponame === "") {
			alert("Failure, no repo name");
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
