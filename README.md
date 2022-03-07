# BE-Project

### Stop word https://www.ranks.nl/stopwords

### TODO:

-   [ ] Pages:
    -   [ ] Index:
        -   NavBar
        -   Info
    -   [x] Avatar:
    -   [ ] HamNosys Editor
    -   [ ] About:
        -   [ ] Inspiration
        -   [ ] Basic Personal Info
        -   [ ] Thank you All
    -   [ ] Lessons:
        -   [ ] Chapter:
            -   [ ] Difficulty
            -   [ ] Description
            -   [ ] ISL 3d Avatar

## Findings

-   Project uses `https://vh.cmp.uea.ac.uk/index.php/CWASA_Local_Installation` for the installation of the CWASA tool mainly `jas`.
-   From html file we load `cwasa.css` and `allcsa.js` files.
    -   `allcsa.js` file contains all the logic for the CWASA tool.
    -   The file exposes following APIs:
        -   `CWASA.init` = _cwasaInit_;
        -   `CWASA.playSiGMLURL` = _playSiGMLURL_;
        -   `CWASA.playSiGMLText` = _playSiGMLText_;
        -   `CWASA.stopSiGML` = _stopSiGML_;
        -   `CWASA.getLogger` = _getLogger_;
        -   `CWASA.addHook` = _Logger.addHook_;
        -   `CWASA.callHook` = _Logger.callHook_;
-   `CWASA.init` is called with `intialConfig` as the argument. initialise the CWASA tool.
-   `CWASA.playSiGMLURL` is called with `url` as the argument. It loads the SiGML file from the given URL. and plays the SiGML file.
-   `CWASA.playSiGMLText` is called with `sigmlText` as the argument and it plays the SiGML text.
-   `CWASA.stopSiGML` is called to stop avatar animation.

---

## Hook

-   `CWASA.addHook` use to add hook on different events (usage: CWA.addHook(event, callback)):

```javascript
    CWASA.addHook("avatarfps", function(evt) {
        // Called every second
        console.log("avatarfps: " + evt.msg);
    });
    // Output
    {typ: 'avatarfps', msg: 25.717111770524234, av: 0}

    CWASA.addHook("avatarframe", function(evt) {
        // Called every new frame
        console.log("Current gloss number: " + (evt.msg.s + 1));
        console.log("Current Frame: " + (evt.msg.f + 1));
    });
    // Output
    {typ: "avatarframe", msg: { f: 1, s: 0}, av: 0}

    CWASA.addHook("avatarsign", function(evt) {
        // Called at the start of every new gloss
        console.log("Current gloss: " + evt.msg.g);
        console.log("Current gloss index: " + evt.msg.s);
        console.log("Current frame: " + evt.msg.f);
    });
    // Output
    {typ: "avatarsign", msg: {g: 'your', f: 1, s: 0}, av: 0}

    CWASA.addHook("avatarloaded", function(evt) {
        // Called when loading of avatar is complete whenever avatar is changed
        console.log("Current selected Avatar: " + evt.msg);
    });
    // Output
    {typ: "avatarloaded", msg: "francoise", av: 0}

    CWASA.addHook("sigmlloading", function(evt) {
        // Called when sigml file is begin loading
        console.log("Sigml loading: ");
    });
    // Output
    {typ: "sigmlloading", msg: null, av: 0}

    CWASA.addHook("sigmlloaded", function(evt) {
        // Called when sigml file is complete loading
        console.log("Sigml loading complete!");
        console.log("Number of glosses: " + evt.msg.s);
        console.log("Number of frames: " + evt.msg.f);

    });
    // Output
    {typ: "sigmlloaded", msg: {s: 1, f: 47}, av: 0}

    CWASA.addHook("animactive", function(evt) {
        // Called when animation starts
        console.log("Animation starts!");
    });
    // Output
    {typ: "animactive", msg:  null, av: 0}

    CWASA.addHook("animidle", function(evt) {
        // Called when animation stops / completes
        console.log("Animation Ended!");
    });
    // Output
    {typ: "animidle", msg:  null, av: 0}

    CWASA.addHook("status", function(evt) {
        // Called when some state changes like
        // loading avatar/sigml, playing starts / end
        console.log("Current event: ",evt.msg);
    });
    // Output
    // Avatar loading
    {typ: 'status', msg: 'SiGML Loading for francoise', av: 0}
    // Playing Start
    {typ: 'status', msg: 'Playing starts', av: 0}
    // SiGML loaded
    {typ: 'status', msg: 'SiGML Loaded', av: 0}
    // Playing complete
    {typ: 'status', msg: 'Playing complete', av: 0}

```
