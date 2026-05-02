# DG — Dave Grainger Art

A clean, minimal gallery website for Dave Grainger's original paintings.

## Local development

```bash
npm install
npm run dev
```

Then open http://localhost:5173

## Deploy to Vercel

### First time
1. Push this folder to a new GitHub repo (e.g. `dg-art`)
2. Go to vercel.com → Add New Project → import the repo
3. Framework preset: Vite
4. Click Deploy — done

### Updates
```bash
git add .
git commit -m "your message"
git push
```
Vercel redeploys automatically.

---

## Adding real photos

When Dave's paintings are photographed:

1. Copy photos into `/public/paintings/` — e.g. `public/paintings/low-tide.jpg`
2. Open `src/paintings.js`
3. Add an `image` field to the relevant painting:

```js
{
  id: 2,
  title: 'Low Tide',
  ...
  image: '/paintings/low-tide.jpg',   // add this line
}
```

The site will automatically show the real photo instead of the placeholder.

**Photo tips for best results:**
- Natural daylight, no direct sun, no flash
- Flat-on shot, no angle
- Neutral wall or floor behind the painting
- Consistent framing across all shots so the gallery grid looks cohesive
- A modern phone camera is perfectly adequate

---

## Adding new paintings

Add a new entry to the `PAINTINGS` array in `src/paintings.js`:

```js
{
  id: 13,                             // next available number
  title: 'Your Painting Title',
  medium: 'Oil on canvas',            // or Watercolour, Oil on board, etc.
  dimensions: '50 × 70 cm',
  price: 350,
  available: true,                    // false = shows as Sold
  palette: ['#hex1', '#hex2', '#hex3'], // placeholder colours until photo added
  // image: '/paintings/filename.jpg', // uncomment when photo is ready
}
```

---

## Wiring up the contact & enquiry forms

Currently the forms simulate submission (show a thank-you message).
To receive real emails:

1. Create a free account at [formspree.io](https://formspree.io)
2. Create a new form — Formspree gives you an endpoint like `https://formspree.io/f/xyzabcde`
3. In `src/App.jsx`, find the two `onClick={() => setSent(true)}` buttons
4. Replace with a proper fetch call:

```js
const handleSubmit = async () => {
  await fetch('https://formspree.io/f/YOUR_ID', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(form),
  })
  setSent(true)
}
```

---

## Marking a painting as sold

In `src/paintings.js`, change `available: true` to `available: false`.
The painting stays visible in the gallery with a Sold overlay — this is intentional.
Sold paintings provide social proof that people value the work enough to buy it.
