(function () {
  window.addEventListener("tizenhwkey", function (ev) {
    var activePopup = null,
      page = null,
      pageId = "";

    if (ev.keyName === "back") {
      activePopup = document.querySelector(".ui-popup-active");
      page = document.getElementsByClassName("ui-page-active")[0];
      pageId = page ? page.id : "";

      if (pageId === "main" && !activePopup) {
        try {
          tizen.application.getCurrentApplication().exit();
        } catch (ignore) {
        }
      } else {
        window.history.back();
      }
    }
  });
  const api = 'https://kaist-cafeteria.du.r.appspot.com/';
  window.onload = () => {
    const date = new Date();
    const y = (date.getYear() + 1900).toString();
    const _m = (date.getMonth() + 1).toString();
    const m = (_m.length === 1) ? `0${_m}` : _m;
    const _d = date.getDate().toString();
    const d = (_d.length === 1) ? `0${_d}` : _d;

    const ids = [
      'div-east-breakfast',
      'div-east-lunch',
      'div-east-dinner',
      'div-west-breakfast',
      'div-west-lunch',
      'div-west-dinner'
    ];
    ids.forEach(id => {
      const style = document.getElementById(id).style;
      style.fontSize = "65%";
      style.lineHeight = "1.2";
      style.marginBottom = "0";
      if (id !== 'div-west-dinner')
        style.paddingBottom = "20px";
    });

    (() => {
      const req = new XMLHttpRequest();
      req.onreadystatechange = () => {
        if (req.readyState === XMLHttpRequest.DONE && req.status === 200) {
          const { breakfast, lunch, dinner } = JSON.parse(req.responseText);
          document.getElementById('div-east-breakfast').innerText = `아침: ${breakfast}`;
          document.getElementById('div-east-lunch').innerText = `점심: ${lunch}`;
          document.getElementById('div-east-dinner').innerText = `저녁: ${dinner}`;
        }
      };
      req.open('GET', `${api}?name=east1&y=${y}&m=${m}&d=${d}`);
      req.send();
    })();

    (() => {
      const req = new XMLHttpRequest();
      req.onreadystatechange = () => {
        if (req.readyState === XMLHttpRequest.DONE && req.status === 200) {
          const { breakfast, lunch, dinner } = JSON.parse(req.responseText);
          document.getElementById('div-west-breakfast').innerText = `아침: ${breakfast}`;
          document.getElementById('div-west-lunch').innerText = `점심: ${lunch}`;
          document.getElementById('div-west-dinner').innerText = `저녁: ${dinner}`;
        }
      };
      req.open('GET', `${api}?name=west&y=${y}&m=${m}&d=${d}`);
      req.send();
    })();
  };
}());
