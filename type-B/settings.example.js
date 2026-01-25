var settings = {
  // Overrides the CSS font-size for the prompt text.
  // Leave empty ('') to use the default:
  // max(min(2.5vw, 5vh), 20px)
  fontSize: '',

  // Overrides the CSS font-family for the prompt text.
  // Leave empty ('') to use the default font.
  fontFamily: '',

  // Maximum number of unique mistyped character positions allowed before the attempt is invalidated.
  // (Repeated mistakes on the same character count as one.)
  typosIndexThreshold: 5,

  // Base KPM threshold for disqualification. If the player's KPM falls below this value, the attempt fails.
  // (This value serves as the initial threshold and increases with successful attempts.)
  initialKpmThreshold: 460,

  // Amount added to the KPM threshold after each successful attempt.
  // This value is added to the initialKpmThreshold cumulatively.
  kpmThresholdIncrement: 10,

  // Minimum number of attempts before disqualification checks are applied.
  // Until this number of attempts has been made, the session will not end even if there are disqualified attempts.
  minAttempts: 5,

  // Minimum number of successful attempts required before the session
  // becomes eligible for termination. If the number of successes is below
  // this value, the session continues even if failures occur.
  minSuccessCount: 2,

  // Behavior of the KPM threshold when an attempt fails.
  // "increase" : The threshold increases even on failure.
  // "none"     : The threshold does not change on failure.
  // "decrease" : The threshold decreases on failure.
  kpmThresholdOnFail: "none",

  // Default prompt key used when no "prompt" parameter is provided
  // in the URL query (read via URLSearchParams).
  defaultPromptKey: "chienomi",
}
