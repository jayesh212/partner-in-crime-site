# Builds privacy.html and support.html from one shell.
SHELL = '''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{title} · Partner in Crimes</title>
<meta name="description" content="{desc}">
<link rel="canonical" href="https://jayesh212.github.io/partner-in-crime-site/{file}">
<meta name="theme-color" content="#EEECE6" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#17161C" media="(prefers-color-scheme: dark)">
<link rel="icon" href="img/mark.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="img/touch-icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=IBM+Plex+Mono:wght@400;500;600&family=Instrument+Sans:wght@400;600&display=swap">
<link rel="stylesheet" href="styles.css">
<script>try{{var t=localStorage.getItem('pic-theme');if(t==='light'||t==='dark')document.documentElement.dataset.theme=t}}catch(e){{}}</script>
</head>
<body class="docpage">
<a class="skip" href="#main">Skip to content</a>
<header class="nav is-scrolled">
  <div class="wrap nav__in">
    <a class="brand" href="./" aria-label="Partner in Crimes, home">
      <span class="mark" aria-hidden="true"><i class="ink ink--a"></i><i class="ink ink--b"></i></span>
      <span class="brand__word">Partner in Crimes</span>
    </a>
    <nav class="doc__nav" aria-label="Pages">
      <a href="privacy.html"{p_cur}>Privacy</a>
      <a href="support.html"{s_cur}>Support</a>
    </nav>
    <button class="theme" type="button" data-theme-btn aria-label="Colour theme: auto">
      <span class="theme__dot" aria-hidden="true"></span><span class="theme__txt" data-theme-txt>Auto</span>
    </button>
  </div>
</header>
<main id="main" class="doc">
  <div class="wrap doc__grid">
    <header class="doc__head">
      <p class="lab">{kicker}</p>
      <h1 class="h2 mis">{h1}</h1>
      <p class="doc__lede">{lede}</p>
    </header>
    <div class="doc__body">
{body}
    </div>
  </div>
</main>
<footer class="foot foot--doc">
  <div class="wrap foot__row">
    <p class="foot__small">For iPhone. © 2026 Partner in Crimes.</p>
    <nav aria-label="Footer"><a href="./">Home</a><a href="privacy.html">Privacy</a><a href="support.html">Support</a></nav>
  </div>
</footer>
<script src="theme.js" defer></script>
</body>
</html>
'''

ISSUES = 'https://github.com/jayesh212/partner-in-crime-site/issues'

PRIVACY = '''
      <section class="doc__card doc__card--sum" aria-labelledby="short">
        <h2 id="short">The short version</h2>
        <ul class="doc__ticks">
          <li>No ads. No tracking. No third-party analytics.</li>
          <li>Your journal is yours. Not even your partner can read it.</li>
          <li>Delete everything from the app, any time.</li>
        </ul>
      </section>

      <section aria-labelledby="collect">
        <h2 id="collect">What we keep</h2>
        <dl class="doc__list">
          <div><dt>Account</dt><dd>You sign in with Apple. We get your name and Apple's private relay email (or your real email, if you choose to share it). No passwords.</dd></div>
          <div><dt>What you add</dt><dd>Water, tasks, events, goals, moods, messages in The Hideout, drawings, game turns and your pets and plants.</dd></div>
          <div><dt>Photos</dt><dd>Photos you add to the calendar. We store the original and a small copy for quick loading.</dd></div>
          <div><dt>Journal</dt><dd>Wind-down entries. Only you can read the text. Your partner sees stats, never words.</dd></div>
          <div><dt>Apple Health</dt><dd>Only if you allow it: your daily total steps and active calories. Nothing else from Health.</dd></div>
        </dl>
      </section>

      <section aria-labelledby="partner">
        <h2 id="partner">What your partner sees</h2>
        <p>Things you share on purpose: shared tasks, water, events, photos, messages, games and your pets. Stats and moods appear only if you choose to share them. Private tasks and journal text stay private.</p>
      </section>

      <section aria-labelledby="where">
        <h2 id="where">Where it lives</h2>
        <p>On Amazon Web Services in the US (Oregon, us-west-2), with photos in Amazon S3, and in a PostgreSQL database hosted by Aiven. These providers store data for us. They don't use it for anything else.</p>
      </section>

      <section aria-labelledby="never">
        <h2 id="never">What we never do</h2>
        <p>Sell your data. Show ads. Track you across apps or websites. Use third-party analytics. Share Health data with anyone.</p>
      </section>

      <section aria-labelledby="control">
        <h2 id="control">Export, unpair, delete</h2>
        <dl class="doc__list">
          <div><dt>Export</dt><dd>Download a copy of your data from the app.</dd></div>
          <div><dt>Unpair</dt><dd>Can be undone for 30 days.</dd></div>
          <div><dt>Delete</dt><dd>Delete your account in the app. Your data is erased after 30 days, unless you sign back in before then.</dd></div>
        </dl>
      </section>

      <section aria-labelledby="kids">
        <h2 id="kids">Children</h2>
        <p>Partner in Crimes is not made for children under 13.</p>
      </section>

      <section aria-labelledby="changes">
        <h2 id="changes">Changes and questions</h2>
        <p>If this policy changes, we'll update this page and the date below. Questions: <a href="support.html">Support</a>.</p>
        <p class="lab doc__date">Effective 12 October 2026</p>
      </section>
'''

SUPPORT = f'''
      <section class="doc__card" aria-labelledby="contact">
        <h2 id="contact">Get in touch</h2>
        <p>Report a bug or ask a question on GitHub. Please don't post personal details there; it's public.</p>
        <p><a class="btn btn--two doc__btn" href="{ISSUES}" rel="noopener">Open a GitHub issue <span aria-hidden="true">→</span></a></p>
      </section>

      <section aria-labelledby="faq">
        <h2 id="faq">Common questions</h2>
        <div class="faq__list">
          <details><summary>How do we pair?</summary><p>One of you shares a pairing code from the app. The other enters it. That's it.</p></details>
          <details><summary>Can I undo unpairing?</summary><p>Yes. Unpairing can be undone for 30 days.</p></details>
          <details><summary>Can my partner read my journal?</summary><p>No. Journal text is only readable by its writer. Your partner sees stats only.</p></details>
          <details><summary>Where did my pet go?</summary><p>Pets leave if they're neglected. Call them home once a day, three days in a row, and they come back.</p></details>
          <details><summary>How do I export or delete my data?</summary><p>Both are in the app. Deleted data is erased after 30 days unless you sign back in. More in the <a href="privacy.html">privacy policy</a>.</p></details>
          <details><summary>Nudges aren't arriving.</summary><p>Check that notifications are on for Partner in Crimes in iPhone Settings, then open the app once.</p></details>
        </div>
      </section>
'''

for file, kw in {
  'privacy.html': dict(title='Privacy', desc='What Partner in Crimes keeps, who sees it, and how to delete it.', kicker='Privacy policy', h1='What we keep, and who sees&nbsp;it.', lede='Plain words. No ads, no tracking, no fine print hiding behind fine print.', body=PRIVACY, p_cur=' aria-current="page"', s_cur=''),
  'support.html': dict(title='Support', desc='Help with Partner in Crimes.', kicker='Support', h1='Something&nbsp;off?', lede='Tell us what happened. A screenshot and your iOS version help a lot.', body=SUPPORT, p_cur='', s_cur=' aria-current="page"'),
}.items():
  open(file, 'w').write(SHELL.format(file=file, **kw))
