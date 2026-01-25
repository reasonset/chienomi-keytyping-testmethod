var test_string_ary = []
var test_string_elm_ary = []
var current_index = 0
const test_text_field = document.getElementById("TestTextField")
const kpm_threshold_box = document.getElementById("CurrentKPMThreshold")
let start_at
let end_at
var status_bar = document.getElementById("StatusBar")
var wrong_index = new Set()
let wrong_count = 0
var attempts = []
const urlparams = new URLSearchParams(location.search)
const test_string = statements[urlparams.get("prompt") || settings.defaultPromptKey] || statements[settings.defaultPromptKey]
const last_index = test_string.length - 1
var current_threshold = urlparams.get("threshold") ? Number(urlparams.get("threshold")) : settings.initialKpmThreshold
var this_result = {}
const kpmThresholdIncrement = settings.kpmThresholdIncrement

function initial_callback() {
  start_at = new Date()
}

function type_callback(e) {
  if (e.key === "Backspace" || e.key === " ") { e.preventDefault() }
  if (e.key.length !== 1) {return} // Non character key.
  const right = test_string_ary[current_index] == e.key
  if (!current_index) {
    if (right) {
      initial_callback()
    } else {
      return
    }
  }
  if (right) {
    test_string_elm_ary[current_index].className = "ok_char"
    status_bar.className = "status_ok"
    current_index++
  } else {
    wrong_count++
    test_string_elm_ary[current_index].className = "wrong_char"
    status_bar.className = "status_wrong"
    wrong_index.add(current_index)
  }
  if (current_index > last_index) {
    end_at = new Date()
    finish()
  }
}

function create_testbody() {
  if (settings?.fontSize) {
    test_text_field.style.fontSize = settings.fontSize
  }
  if (settings?.fontFamily) {
    test_text_field.style.fontFamily = settings.fontFamily
  }

  const ac = document.getElementsByClassName("attempt_count")
  for (let i=0; i<ac.length; i++) {
    ac[i].innerHTML = ""
    ac[i].appendChild(document.createTextNode(attempts.length + 1))
  }

  kpm_threshold_box.innerHTML = ""
  kpm_threshold_box.appendChild(document.createTextNode(current_threshold))

  for (let i=0; i<test_string.length; i++) {
    const elm = document.createElement("span")
    if (test_string[i] === " ") {
      elm.className = "space_char"
    } else {
      elm.className = "normal_char"
    }
    elm.appendChild(document.createTextNode(test_string[i]))
    test_string_ary.push(test_string[i])
    test_string_elm_ary.push(elm)
    test_text_field.appendChild(elm)
  }

  try {
    window.removeEventListener("keydown", next_attempt_callback)
  } catch(e) {
    void 0
  }
  window.addEventListener("keydown", type_callback)
}

function finish() {
  window.removeEventListener("keydown", type_callback)

  const start_at_unix = start_at.getTime()
  const end_at_unix = end_at.getTime()

  const duration = end_at_unix - start_at_unix
  const duration_s = duration / 1000

  const multiplier = 60 / duration_s
  const kpm = test_string.length * multiplier
  const wrong = wrong_index.size

  this_result = {
    duration_s,
    kpm,
    wrong,
    qualified: true
  }

  if (current_threshold > kpm) { this_result.qualified = false }
  if (settings.typosIndexThreshold < wrong) { this_result.qualified = false }

  attempts.push(this_result)

  attempt_results = {
    time: {best: Infinity, worst: 0, items: []},
    kpm: {best: 0, worst: Infinity, items: []},
    wrong: {best: Infinity, worst: 0, items: []}
  }

  for (const i of attempts) {
    attempt_results.time.items.push(i.duration_s)
    if (attempt_results.time.best > i.duration_s) { attempt_results.time.best = i.duration_s }
    if (attempt_results.time.worst < i.duration_s) { attempt_results.time.worst = i.duration_s }

    attempt_results.kpm.items.push(i.kpm)
    if (attempt_results.kpm.best < i.kpm) { attempt_results.kpm.best = i.kpm }
    if (attempt_results.kpm.worst > i.kpm) { attempt_results.kpm.worst = i.kpm }

    attempt_results.wrong.items.push(i.wrong)
    if (attempt_results.wrong.best > i.wrong) { attempt_results.wrong.best = i.wrong }
    if (attempt_results.wrong.worst < i.wrong) { attempt_results.wrong.worst = i.wrong }
  }

  const mean_time = attempt_results.time.items.reduce(((x,y) => x+y), 0) / attempt_results.time.items.length
  const mean_kpm = attempt_results.kpm.items.reduce(((x,y) => x+y), 0) / attempt_results.kpm.items.length
  const mean_wrong = attempt_results.wrong.items.reduce(((x,y) => x+y), 0) / attempt_results.wrong.items.length

  document.getElementById("ResultTime").value = duration_s.toFixed(3)
  document.getElementById("ResultTimeBest").value = attempt_results.time.best.toFixed(3)
  document.getElementById("ResultTimeWorst").value = attempt_results.time.worst.toFixed(3)
  document.getElementById("ResultTimeMean").value = mean_time.toFixed(3)

  document.getElementById("ResultKPM").value = kpm.toFixed(1)
  document.getElementById("ResultKPMBest").value = attempt_results.kpm.best.toFixed(1)
  document.getElementById("ResultKPMWorst").value = attempt_results.kpm.worst.toFixed(1)
  document.getElementById("ResultKPMMean").value = mean_kpm.toFixed(1)

  document.getElementById("ResultWrong").value = wrong
  document.getElementById("ResultWrongBest").value = attempt_results.wrong.best
  document.getElementById("ResultWrongWorst").value = attempt_results.wrong.worst
  document.getElementById("ResultWrongMean").value = mean_wrong.toFixed(1)

  if (!this_result.qualified) {
    document.getElementById("AttemptFailed").style.display = "block"
  }

  document.getElementById("Result").style.display = "block"

  // END GAME or NEXT ATTEMPT
  if (attempts.length >= settings.minAttempts && attempts.some(i => !i.qualified)  && attempts.filter(i => i.qualified ).length >= settings.minSuccessCount) {
    const qf_result = attempts.filter(i => i.qualified)
    document.getElementById("FinalResultPassed").appendChild(document.createTextNode(qf_result.length))
    const final_kpm = qf_result.reduce(((a,b) => a + b.kpm), 0) / qf_result.length
    document.getElementById("FinalResultKPM").appendChild(document.createTextNode(final_kpm.toFixed(1)))
    document.getElementById("FinishedText").style.display = "block"
  } else {
    document.getElementById("NextTo").style.display = "block"
    window.addEventListener("keydown", next_attempt_callback)
  }
}

function next_attempt() {
  document.getElementById("Result").style.display = ""
  document.getElementById("AttemptFailed").style.display = ""
  document.getElementById("NextTo").style.display = ""
  test_string_ary = []
  test_string_elm_ary = []
  start_at = null
  end_at = null
  current_index = 0
  status_bar.className = "status_none"
  test_text_field.innerHTML = ""
  wrong_index = new Set()
  wrong_count = 0

  if (this_result.qualified) {
    current_threshold = current_threshold + kpmThresholdIncrement
  } else {
    switch (settings.kpmThresholdOnFail) {
      case "increase":
        current_threshold = current_threshold + kpmThresholdIncrement
        break
      case "decrease":
        current_threshold = current_threshold - kpmThresholdIncrement
        break
    }
  }

  create_testbody()
}

function next_attempt_callback(e) {
  if (e.key === "Enter") {
    next_attempt()
  }
}

create_testbody()
