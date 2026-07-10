// Inhalte des Mathe-Snacks: Häufigkeiten & Mittelwert
// Hinweis: Bei den Quiz-Schritten steht die richtige Antwort nicht als Klartext-Index,
// sondern als SHA-256-Hash ("correctHash") des korrekten Antworttexts (getrimmt, kleingeschrieben).
// Das verhindert, dass die Lösung beim Öffnen dieser Datei direkt sichtbar ist.

const story = [
  {
    type: 'info',
    text: "Hey! 👋 Wir haben in der 6b gerade in Mathe eine Umfrage gemacht: Wie kommt ihr eigentlich zur Schule? 🚶🚲🚌🚗"
  },
  {
    type: 'info',
    text: "Hier ist unsere Tabelle (25 Kinder insgesamt):" +
      "<table class='data'><tr><th>Schulweg</th><th>Anzahl Kinder</th></tr>" +
      "<tr><td>zu Fuß</td><td>5</td></tr>" +
      "<tr><td>Fahrrad</td><td>10</td></tr>" +
      "<tr><td>Bus</td><td>8</td></tr>" +
      "<tr><td>Auto</td><td>2</td></tr></table>"
  },
  {
    type: 'quiz',
    text: "Erste Frage: Wie viele Kinder aus der Klasse kommen mit dem <b>Fahrrad</b> zur Schule?",
    options: ["8 Kinder", "10 Kinder", "5 Kinder", "25 Kinder"],
    correctHash: "cc82e804da4084164c4d2ab1d494342a6f2ea530581d9f38d2c907374934fe9d",
    feedbackCorrect: "Genau, 10 Kinder! Das ist die <b>absolute Häufigkeit</b>. Sie sagt dir direkt, wie oft ein Wert vorkommt.",
    feedbackWrong: "Schau nochmal in die Tabelle bei der Zeile 'Fahrrad' nach."
  },
  {
    type: 'info',
    text: "Die absolute Häufigkeit ist also einfach die Anzahl. Aber was, wenn ich vergleichen will, ob in einer anderen Klasse (nur 20 Kinder) relativ mehr oder weniger mit dem Rad fahren? Dann reicht die reine Anzahl nicht. Dafür gibt's die <b>relative Häufigkeit</b>."
  },
  {
    type: 'quiz',
    text: "Was beschreibt die relative Häufigkeit?",
    options: [
      "Wie oft ein Wert absolut vorkommt",
      "Welchen Anteil ein Wert an der Gesamtzahl hat (z. B. als Bruch, Dezimalzahl oder Prozent)",
      "Den Durchschnitt aller Werte",
      "Die größte Zahl in einer Reihe"
    ],
    correctHash: "6afa05a06546eb050c6c0ee40dbc0c257413c80d9a66c8fef2001aad47f740ff",
    feedbackCorrect: "Richtig! Die relative Häufigkeit zeigt den <b>Anteil</b>: absolute Häufigkeit : Gesamtanzahl.",
    feedbackWrong: "Denk an das Wort 'relativ': Es geht um einen Anteil im Vergleich zum Ganzen, nicht um die reine Anzahl."
  },
  {
    type: 'quiz',
    text: "Wie groß ist die relative Häufigkeit für 'Fahrrad' (10 von 25 Kindern)?",
    options: ["10 %", "4 %", "40 %", "25 %"],
    correctHash: "bf00286850bcb78d4f8417bbf4948c56cb5ff37699eb0c497b7fe18a9d677a48",
    feedbackCorrect: "10 : 25 = 0,4 = <b>40 %</b>. Sauber gerechnet!",
    feedbackWrong: "Rechne: 10 : 25 = ? Das Ergebnis dann noch mit 100 multiplizieren, um Prozent zu erhalten."
  },
  {
    type: 'info',
    text: "Stark! 💪 Jetzt zu unserer zweiten Frage: Fünf Radfahrer aus der Klasse haben aufgeschrieben, wie viele Kilometer sie zur Schule fahren:<br><b>2 km, 3 km, 1 km, 4 km, 5 km</b>. Wir berechnen jetzt den Durchschnitt: das <b>arithmetische Mittel</b>."
  },
  {
    type: 'quiz',
    text: "Wie berechnet man das arithmetische Mittel mehrerer Werte?",
    options: [
      "Man addiert alle Werte und teilt durch die Anzahl der Werte",
      "Man sucht den größten Wert heraus",
      "Man addiert alle Werte und teilt durch 2",
      "Man zählt, wie oft der häufigste Wert vorkommt"
    ],
    correctHash: "9887d460691a7690457eff50de5ea9a1717dc67d519b1a066d5089e3d2e5937d",
    feedbackCorrect: "Genau: Summe aller Werte : Anzahl der Werte.",
    feedbackWrong: "Denk an die Formel: Summe aller Werte, geteilt durch die Anzahl der Werte."
  },
  {
    type: 'quiz',
    text: "Berechne das arithmetische Mittel von 2 km, 3 km, 1 km, 4 km, 5 km.",
    options: ["2,5 km", "15 km", "3 km", "5 km"],
    correctHash: "c3c6fe653a50fdf4e758d73d9e3249c11e8aed4e650fefec29f937b57e745b95",
    feedbackCorrect: "2 + 3 + 1 + 4 + 5 = 15, und 15 : 5 = <b>3 km</b>. Im Schnitt fahren die Kinder 3 km mit dem Rad zur Schule.",
    feedbackWrong: "Addiere zuerst alle fünf Werte (die Summe) und teile das Ergebnis dann durch 5 (die Anzahl der Werte)."
  },
  {
    type: 'quiz',
    text: "Ui, wir haben auch gerade eine Matheschulaufgabe zurückbekommen 😅 Das sind die Noten aus unserer Klasse:<br><b>3, 1, 4, 5, 3, 4, 2, 1, 2, 1, 4</b><br>Wie hoch ist die absolute Häufigkeit der Note 1?",
    options: ["1", "3", "4", "11"],
    correctHash: "4e07408562bedb8b60ce05c1decfe3ad16b72230967de01f640b7e4729b49fce",
    feedbackCorrect: "Genau, die Note 1 taucht 3-mal auf. Das ist die <b>absolute Häufigkeit</b> der Note 1.",
    feedbackWrong: "Zähl noch mal ganz genau nach, wie oft die Zahl 1 in der Liste 3, 1, 4, 5, 3, 4, 2, 1, 2, 1, 4 vorkommt."
  },
  {
    type: 'quiz',
    text: "Wir bleiben bei dieser Notenliste. Angenommen, du willst jetzt die <b>relative</b> Häufigkeit einer Note berechnen. Durch welche Zahl musst du dafür teilen?",
    options: [
      "5, weil es die Noten 1 bis 5 gibt",
      "6, weil 5 + 1 die nächsthöhere Zahl ist",
      "10, weil das eine runde Zahl ist",
      "11, weil so viele Noten insgesamt geschrieben wurden"
    ],
    correctHash: "7fde8b1c3ba8e1ba1d349379ddbd5afda499751adcba5e8993086d953757c0b9",
    feedbackCorrect: "Richtig! Für die relative Häufigkeit teilst du immer durch die <b>Gesamtanzahl aller Werte</b> - hier durch 11, nicht durch die Anzahl der Notenstufen.",
    feedbackWrong: "Zähl noch mal, wie viele Noten insgesamt in der Liste stehen - nicht wie viele verschiedene Notenstufen es von 1 bis 5 gibt."
  },
  {
    type: 'quiz',
    text: "In einer weiteren Arbeit haben 4 von 20 Schülerinnen und Schülern die Note 'gut' (also die Note 2) bekommen. Wie hoch ist die relative Häufigkeit der Note 2 in dieser Arbeit?",
    options: ["4 %", "20 %", "80 %", "0,2 %"],
    correctHash: "7ae8d407dd41b0f28c0c8ce78128e16988117cf7bf6b01e1c2cf6bedd726d646",
    feedbackCorrect: "Stimmt! 4 : 20 = 0,2 = <b>20 %</b>.",
    feedbackWrong: "Rechne zuerst 4 : 20 und wandle das Ergebnis dann in Prozent um (also mal 100)."
  },
  {
    type: 'quiz',
    text: "Zum Schluss noch eine kleine Transferaufgabe: In einer anderen Umfrage kommen von 40 Kindern 6 mit dem Auto zur Schule. Wie groß ist die relative Häufigkeit für 'Auto'?",
    options: ["6 %", "15 %", "34 %", "60 %"],
    correctHash: "d2de465fc2ea21ea28ab8fddc8bd39c6f45bde60cf02ff4f23acaf47332cb98e",
    feedbackCorrect: "6 : 40 = 0,15 = <b>15 %</b>. Perfekt kombiniert!",
    feedbackWrong: "Rechne 6 : 40 und wandle das Ergebnis in Prozent um (× 100)."
  },
  {
    type: 'info',
    text: "Mega, du hast alles drauf! 🎉<br><br><b>Absolute Häufigkeit</b> = wie oft ein Wert vorkommt (Anzahl).<br><b>Relative Häufigkeit</b> = Anteil am Ganzen (absolute Häufigkeit : Gesamtanzahl).<br><b>Arithmetisches Mittel</b> = Summe aller Werte : Anzahl der Werte.<br><br>Weiter so!"
  }
];
