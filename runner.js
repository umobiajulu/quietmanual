import { 
  Document, Packer, Paragraph, TextRun, AlignmentType, PageBreak, 
  Table, TableRow, TableCell, BorderStyle, WidthType, ShadingType, VerticalAlign 
} from 'docx';
import fs from 'fs';


const font     = "Garamond";
const bodySize = 24;
const PAGE_W   = 11160;
const MARGIN   = 1440;
const CW       = PAGE_W - MARGIN * 2;

const hair  = { style: BorderStyle.SINGLE, size: 2, color: "CCCCCC" };
const mid   = { style: BorderStyle.SINGLE, size: 4, color: "888888" };
const thick = { style: BorderStyle.SINGLE, size: 8, color: "444444" };
const none  = { style: BorderStyle.NONE,  size: 0, color: "FFFFFF" };

const pb = () => new Paragraph({ children: [new PageBreak()] });
const sp = (n=1) => new Paragraph({ children:[new TextRun({text:"",size:bodySize})], spacing:{after:180*n} });

function body(text, opts={}) {
  return new Paragraph({
    alignment: AlignmentType.BOTH, spacing:{before:0,after:220},
    indent: opts.noIndent ? {} : {firstLine:720},
    children:[new TextRun({text,font,size:bodySize,italics:opts.italic||false,bold:opts.bold||false})]
  });
}
function bodyC(text, opts={}) {
  return new Paragraph({
    alignment:AlignmentType.CENTER, spacing:{before:0,after:220},
    children:[new TextRun({text,font,size:bodySize,italics:opts.italic||false,bold:opts.bold||false})]
  });
}
function ornament() {
  return new Paragraph({
    alignment:AlignmentType.CENTER, spacing:{before:280,after:280},
    children:[new TextRun({text:"\u2014 \u2022 \u2014",font,size:bodySize,italics:true})]
  });
}
function pullQuote(text) {
  return new Paragraph({
    alignment:AlignmentType.CENTER, spacing:{before:320,after:320},
    children:[new TextRun({text:`\u201C${text}\u201D`,font,size:26,italics:true,color:"444444"})]
  });
}
function partPage(roman, title, subtitle) {
  return [
    sp(8),
    new Paragraph({alignment:AlignmentType.CENTER,spacing:{before:0,after:120},children:[new TextRun({text:`SECTION ${roman}`,font,size:20,bold:true,characterSpacing:100})]}),
    new Paragraph({alignment:AlignmentType.CENTER,spacing:{before:0,after:200},children:[new TextRun({text:title.toUpperCase(),font,size:44,bold:true,characterSpacing:40})]}),
    new Paragraph({alignment:AlignmentType.CENTER,spacing:{before:0,after:0},children:[new TextRun({text:subtitle,font,size:22,italics:true})]}),
    sp(10), pb()
  ];
}
function chapterTitle(n, title, subtitle) {
  const arr = [
    sp(4),
    new Paragraph({alignment:AlignmentType.CENTER,spacing:{before:0,after:100},children:[new TextRun({text:n?"CHAPTER "+n:"FINAL CHAPTER",font,size:18,bold:true,characterSpacing:120})]}),
    new Paragraph({alignment:AlignmentType.CENTER,spacing:{before:0,after:subtitle?160:600},children:[new TextRun({text:title,font,size:36,bold:true})]})
  ];
  if(subtitle) arr.push(new Paragraph({alignment:AlignmentType.CENTER,spacing:{before:0,after:600},children:[new TextRun({text:subtitle,font,size:22,italics:true})]}));
  return arr;
}
function wsHead(text) {
  return new Paragraph({
    spacing:{before:360,after:120},
    border:{bottom:{style:BorderStyle.SINGLE,size:4,color:"AAAAAA",space:4}},
    children:[new TextRun({text:text.toUpperCase(),font,size:20,bold:true,characterSpacing:80,color:"444444"})]
  });
}
function mistakeHead(num, text) {
  return [
    sp(2),
    new Paragraph({alignment:AlignmentType.LEFT,spacing:{before:0,after:80},children:[new TextRun({text:`MISTAKE ${num}`,font,size:17,bold:true,color:"999999",characterSpacing:60})]}),
    new Paragraph({alignment:AlignmentType.LEFT,spacing:{before:0,after:320},children:[new TextRun({text:text,font,size:28,bold:true})]})
  ];
}
function infoBox(paragraphs, opts={}) {
  const fill=opts.warning?"FDF5EC":opts.insight?"EEF2F8":opts.action?"EAFAF0":"F2EFE8";
  const bc=opts.warning?"CC8844":opts.insight?"446688":opts.action?"2A7A4A":"888888";
  const b={style:BorderStyle.SINGLE,size:5,color:bc};
  return [sp(1),new Table({width:{size:CW,type:WidthType.DXA},columnWidths:[CW],rows:[new TableRow({children:[new TableCell({borders:{top:b,bottom:b,left:b,right:b},shading:{fill,type:ShadingType.CLEAR},margins:{top:200,bottom:200,left:280,right:280},children:paragraphs})]})]
  }),sp(1)];
}
function ibP(text, opts={}) {
  return new Paragraph({alignment:AlignmentType.BOTH,spacing:{before:0,after:opts.last?0:160},children:[new TextRun({text,font,size:bodySize,italics:opts.italic||false,bold:opts.bold||false})]});
}

// ── WORKSHEET HELPERS ─────────────────────────────────────────────────────────

function wsLabel(text) {
  return new Paragraph({spacing:{before:280,after:80},children:[new TextRun({text:text.toUpperCase(),font,size:18,bold:true,color:"666666",characterSpacing:60})]});
}
function prompt(text, note) {
  const rows=[new Paragraph({spacing:{before:0,after:note?60:100},children:[new TextRun({text,font,size:21,italics:true,color:"333333"})]})];
  if(note) rows.push(new Paragraph({spacing:{before:0,after:100},children:[new TextRun({text:note,font,size:18,color:"999999"})]}));
  return rows;
}
function lines(count, width) {
  return new Table({width:{size:width,type:WidthType.DXA},columnWidths:[width],rows:[new TableRow({children:[new TableCell({
    borders:{top:hair,bottom:hair,left:hair,right:hair},
    shading:{fill:"FDFCFA",type:ShadingType.CLEAR},
    margins:{top:120,bottom:80,left:200,right:200},
    children:Array.from({length:count},(_,i)=>new Paragraph({spacing:{before:0,after:0},border:i<count-1?{bottom:{style:BorderStyle.SINGLE,size:2,color:"E0DDDA",space:0}}:{},children:[new TextRun({text:"",size:26})]}))
  })]})]});
}
function field(label, width) {
  const LW=2600,FW=width-LW;
  return new Table({width:{size:width,type:WidthType.DXA},columnWidths:[LW,FW],rows:[new TableRow({children:[
    new TableCell({borders:{top:none,bottom:none,left:none,right:none},width:{size:LW,type:WidthType.DXA},margins:{top:60,bottom:60,left:0,right:120},children:[new Paragraph({children:[new TextRun({text:label,font,size:20,italics:true,color:"444444"})]})]
    }),
    new TableCell({borders:{top:none,bottom:mid,left:none,right:none},width:{size:FW,type:WidthType.DXA},margins:{top:60,bottom:60,left:0,right:0},children:[new Paragraph({children:[new TextRun({text:"",size:bodySize})]})]
    })
  ]})]});
}
function checkTable(items) {
  return new Table({width:{size:CW,type:WidthType.DXA},columnWidths:[400,CW-400],rows:items.map(text=>new TableRow({height:{value:420,rule:"atLeast"},children:[
    new TableCell({borders:{top:hair,bottom:hair,left:hair,right:hair},width:{size:400,type:WidthType.DXA},shading:{fill:"FAFAF8",type:ShadingType.CLEAR},margins:{top:40,bottom:40,left:60,right:60},verticalAlign:VerticalAlign.CENTER,children:[new Paragraph({alignment:AlignmentType.CENTER,children:[new TextRun({text:"",size:20})]})]}),
    new TableCell({borders:{top:none,bottom:none,left:none,right:none},width:{size:CW-400,type:WidthType.DXA},margins:{top:60,bottom:60,left:200,right:0},verticalAlign:VerticalAlign.CENTER,children:[new Paragraph({children:[new TextRun({text,font,size:20})]})]}),
  ]}))});
}

// Five-foundation quick check (for worksheet)
function foundationCheckWS() {
  const C=[Math.floor(CW*0.19),Math.floor(CW*0.19),CW-Math.floor(CW*0.19)*2];
  const hBorder={top:thick,bottom:thick,left:thick,right:thick};
  const dBorder={top:hair,bottom:hair,left:hair,right:hair};
  const hC=(t,w)=>new TableCell({borders:hBorder,width:{size:w,type:WidthType.DXA},shading:{fill:"E8E4DC",type:ShadingType.CLEAR},margins:{top:100,bottom:100,left:120,right:120},verticalAlign:VerticalAlign.CENTER,children:[new Paragraph({alignment:AlignmentType.CENTER,children:[new TextRun({text:t.toUpperCase(),font,size:17,bold:true,characterSpacing:40})]})]});
  const dC=(t,s,w)=>new TableCell({borders:dBorder,width:{size:w,type:WidthType.DXA},shading:{fill:s,type:ShadingType.CLEAR},margins:{top:80,bottom:80,left:120,right:120},verticalAlign:VerticalAlign.TOP,children:[new Paragraph({children:[new TextRun({text:t,font,size:19})]})]});
  const rows=[
    {f:"Debt",q:"Is net debt at or below zero? Is interest coverage above 5x?"},
    {f:"Earnings",q:"Are earnings positive and consistent across 5+ years?"},
    {f:"Price",q:"Is P/B below 4? Is this the accumulation zone?"},
    {f:"Relevance",q:"Does this business solve a problem the world will have for decades?"},
    {f:"Longevity",q:"Can this business outlive cycles, disruptions, and management transitions?"}
  ];
  return new Table({width:{size:CW,type:WidthType.DXA},columnWidths:C,rows:[
    new TableRow({tableHeader:true,children:[hC("Foundation",C[0]),hC("Pass / Fail / Review",C[1]),hC("Key Question",C[2])]}),
    ...rows.map(({f,q},i)=>new TableRow({height:{value:540,rule:"atLeast"},children:[
      dC(f,i%2===0?"FDFCFA":"F5F3EE",C[0]),
      dC("",i%2===0?"FDFCFA":"F5F3EE",C[1]),
      dC(q,i%2===0?"FDFCFA":"F5F3EE",C[2])
    ]}))
  ]});
}

// ── CONTENT ───────────────────────────────────────────────────────────────────

const content = [

  // ══════════════════════════════════════════════════════════════════════════
  // SECTION 9 — COMMON INVESTOR MISTAKES
  // ══════════════════════════════════════════════════════════════════════════

  ...partPage("NINE","Common Investor Mistakes","The errors that cost more than any market crash"),

  ...chapterTitle("9","What Most Investors Do Wrong","A calm examination of the failures that destroy ordinary portfolios"),

  body("The framework described in this book is not complicated. The five foundations can be evaluated in an afternoon with publicly available data. The screener can be set up in twenty minutes. The accumulation approach is mechanical once the criteria are clear. The exit conditions are explicit. There is no mystery in any of it.",{noIndent:true}),
  body("And yet the majority of individual investors who engage with equity markets do not build the kind of portfolios or achieve the kind of returns that the approach described here would produce. Not because the approach requires unusual intelligence or access. Because the approach requires something that most investors find considerably harder than intelligence: the consistent suppression of the emotional patterns that financial markets are specifically designed to stimulate."),
  body("This chapter names the most common of those patterns. None of them will surprise the reader who has followed this book carefully. But naming them, and understanding their mechanism, is the beginning of the discipline required to avoid them."),

  ornament(),

  ...mistakeHead("1","Emotional Buying"),
  body("Emotional buying is the act of purchasing a stock in response to a feeling rather than an analysis. The feeling is most often excitement: the excitement of a rising price that creates the sense of missing out, the excitement of a news story that makes a business sound exceptional, the excitement of seeing other investors apparently prospering from a position you do not yet hold.",{noIndent:true}),
  body("The mechanism is straightforward. A business\u2019s stock is rising. The rise generates media coverage. The coverage generates awareness and then interest. The interest generates more buying. The more buying generates a faster rise. The faster rise generates more coverage. By the time the ordinary investor hears about the opportunity and decides to act, they are typically entering late in a cycle that the earlier buyers drove upward \u2014 and they are often paying a price that already reflects all of the optimism the story has generated."),
  body("Emotional buying is not distinguished from disciplined buying by the strength of the feeling. It is distinguished by the absence of the analysis. The disciplined investor who has done the foundational work and arrives at conviction about a business may feel genuine excitement about owning it. That is not emotional buying. It is the confirmation of a considered thesis. The emotional buyer feels the excitement first and constructs the analysis afterward to justify the feeling that was already present."),

  pullQuote("Buy on analysis. Everything else is speculation wearing the costume of investment."),

  ornament(),

  ...mistakeHead("2","Chasing Hype"),
  body("Every market cycle produces a category of business that becomes the object of collective excitement: a technology, a commodity, a narrative about the future that captures the imagination of a large number of investors simultaneously and drives money into a class of assets with a speed and enthusiasm that the underlying business reality rarely justifies.",{noIndent:true}),
  body("The investor who chases hype is not investing in the business. They are investing in the story, and stories, unlike businesses, have no earnings, no competitive advantage, and no balance sheet to fall back on when the enthusiasm that created them fades. Stories are the market\u2019s most volatile currency: worth everything when they are being told and nothing when they are not."),
  body("The discipline against hype is simple in principle and difficult in practice. It is the discipline of applying the five foundations to every business, regardless of how compelling the narrative surrounding it appears. A business with no earnings does not pass Foundation 2. A business with extreme debt does not pass Foundation 1. A business trading at twenty or thirty times book value does not fall within the accumulation zone of Foundation 3. The framework does not have an exception clause for exciting stories, and the investor who adds one is undermining the protection the framework provides."),

  ornament(),

  ...mistakeHead("3","Buying Stories Instead of Businesses"),
  body("This is a more subtle version of chasing hype, and it is more dangerous because it affects investors who believe themselves to be disciplined. The story buyer does not chase the latest trend. They identify a business they find genuinely compelling, they research it carefully, and they arrive at a conviction that feels analytical. The problem is that the research was conducted through the lens of the story rather than through the lens of the five foundations.",{noIndent:true}),
  body("A business that has an extraordinary vision, a charismatic leader, and a genuinely important mission may still carry excessive debt, generate inconsistent earnings, and trade at a valuation that demands perfection it has not yet demonstrated. The investor who is captivated by the vision may notice the debt but explain it as a necessary investment in the future. They may see the inconsistent earnings but attribute them to the disruption the company is deliberately causing. They may acknowledge the high valuation but tell themselves that exceptional businesses are worth exceptional prices."),
  body("Each of these explanations may occasionally be correct. The problem is not that they are always wrong. The problem is that they are explanations generated in service of a conclusion already reached, and they therefore cannot be trusted as independent analytical judgments. The story has colonised the analysis."),
  body("The framework is the protection against this. Apply it first, before encountering the story. If the business passes the five foundations, the story is a confirmation. If the business fails the five foundations, the story is irrelevant, however compelling it appears."),

  ornament(),

  ...mistakeHead("4","Over-Diversification"),
  body("Section 2 of this book addressed over-diversification in detail, but it deserves to appear here because it is one of the most common mistakes made by investors who believe they are being prudent.",{noIndent:true}),
  body("The investor who holds forty companies has, in most cases, added holdings not because they found forty genuinely excellent businesses but because they became uncomfortable with concentration and added positions to reduce the psychological discomfort of having too much riding on too few names. This is the management of psychological comfort rather than the management of investment quality."),
  body("The result is a portfolio whose return will closely approximate the market average, without the cost advantages of simply owning the index. The investor has done significant work \u2014 researching, selecting, monitoring forty companies \u2014 and produced an outcome that a simple index fund would have matched at a fraction of the effort and with better cost efficiency. Diluting the portfolio with adequate businesses because concentration feels uncomfortable is one of the more expensive forms of risk management available."),

  ornament(),

  ...mistakeHead("5","Impatience"),
  body("Impatience in equity investing takes several forms, all of them costly. The most common is the expectation that a business bought at a reasonable price should begin producing visible returns within a few months. When it does not, the impatient investor concludes that the thesis was wrong and exits, often at a loss, just before the compounding that patient holding would have produced begins to become visible.",{noIndent:true}),
  body("The mechanism of compounding does not produce results in months. It produces results in years and decades. The investor who monitors quarterly results and becomes anxious when individual quarters disappoint is measuring the wrong thing on the wrong timescale. The quarterly result is not the investment. The business\u2019s development across a decade is the investment. A business that produces slightly disappointing results in a single quarter while its fundamental competitive position, its balance sheet, and its long-term earnings trajectory all remain intact has given the patient investor no reason to act."),
  body("Impatience compounds its damage because the investor who exits early to relieve the discomfort of waiting then faces the task of finding a new opportunity at a comparable price. The market does not reliably provide new opportunities at the moment the impatient investor needs them. The result is often a pattern of buying at reasonable prices, selling too early, and reinvesting at less attractive prices \u2014 a pattern that systematically transfers wealth from the impatient to the patient."),

  ornament(),

  ...mistakeHead("6","Panic Selling"),
  body("Panic selling is the terminal form of impatience, accelerated by fear. It occurs when the combination of falling prices, alarming news, and the apparent certainty of everyone around you that selling is the rational response overwhelms the analytical discipline that the long-term investor needs to sustain.",{noIndent:true}),
  body("The investor who panic sells at the bottom of a market correction \u2014 and most panic selling occurs near the bottom, when the fear is greatest and the news is most alarming \u2014 does two costly things simultaneously. They realise a loss that was, until the moment of sale, only a paper loss. And they exit the position at exactly the moment when, historically, long-term returns for patient holders have been highest. The businesses they sell continue. The prices recover. The investor who sold is no longer in the position to participate in that recovery."),
  body("The protection against panic selling is preparation, not willpower. The investor who has done the foundational analysis and understands deeply why they own a business, and who has written down their investment thesis and the specific conditions under which they would exit, is not protected by better self-control. They are protected by having made the decision in advance, when the conditions that would trigger an exit were clear. When the market falls and the fear rises, the question they ask is not \u201CShould I sell?\u201D It is \u201CDoes this situation match the exit conditions I defined?\u201D If the answer is no, they hold. The framework, not the emotional state of the moment, governs the decision."),

  pullQuote("The market rewards not the loudest man, nor the fastest, but the one who understands what he owns and possesses the patience to remain beside it."),

  sp(2), ornament(), sp(1),
  new Paragraph({alignment:AlignmentType.CENTER,spacing:{before:200,after:120},children:[new TextRun({text:"\u2014 End of Chapter 9 \u2014",font,size:18,italics:true,color:"888888",characterSpacing:60})]}),
  sp(2), pb(),

  // ══════════════════════════════════════════════════════════════════════════
  // FINAL CHAPTER — THE QUIET INVESTOR
  // ══════════════════════════════════════════════════════════════════════════

  ...chapterTitle(null,"The Quiet Investor","A closing word on patience, conviction, and the wealth that grows in silence"),

  body("There is a particular kind of investor who does not appear often in financial media. They do not discuss their positions in public. They do not move quickly when markets move. They are not disturbed by the opinions of analysts or the mood of the crowd. They sit with the businesses they own \u2014 quietly, attentively, without the anxiety that characterises most participation in financial markets \u2014 and they allow those businesses to do the work of growing over the years that the businesses require to do it.",{noIndent:true}),
  body("The market rarely celebrates this investor. The financial media has no appetite for the story of someone who bought a good business at a fair price and then did nothing for a decade. That story has no drama, no reversals, no moments of crisis and recovery. It is simply the story of time passing and a business growing, and at the end of it, the investor has more than they started with by an amount that seems, to the observers of the beginning and the end, almost implausible."),
  body("The implausibility is the product of compounding, and compounding is the product of patience, and patience is the product of understanding. The investor who genuinely understands what they own is not frightened when the price falls, because they know that the price is not the business. They are not tempted when prices rise rapidly, because they know that excitement around a price is not evidence of quality in a business. They are not distracted by what others are doing, because they know that the investment decisions that matter are the ones made through the framework, not the ones made by the crowd."),

  ornament(),

  wsHead("Wealth Grows Invisibly Before It Becomes Visible"),

  body("The growth of long-term equity investment is not linear. It does not announce itself in the early years. A business bought today that compounds at 15% annually will, in five years, have grown to roughly twice its original value. In ten years, to roughly four times. In fifteen years, to roughly eight times. In twenty years, to roughly sixteen times. The growth in the early years feels modest. The growth in the later years is extraordinary.",{noIndent:true}),
  body("What happens during the early years is that the foundation is being laid. The business is earning, reinvesting, growing its competitive position, deepening its relationships with customers, expanding its capabilities. None of this is visible in the stock price, which is moving up and down in response to quarterly results, macroeconomic news, and the changing appetites of a market that is not thinking on the same timeline as the patient investor. The compounding is happening beneath the surface of the price, accumulating unseen, until the time when it is large enough to be undeniable."),
  body("The investor who cannot tolerate this invisible period \u2014 who needs the growth to be visible and confirmed before they can maintain conviction \u2014 will exit the position before the invisible period ends. They will miss the years when the compounding accelerates, when the foundation laid in the early, quiet years begins to produce the visible results that make the investment look, in retrospect, obvious. But it was not obvious then. It was simply well-reasoned, patiently held, and properly understood."),

  ornament(),

  wsHead("Conviction as the Foundation of Patience"),

  body("Patience, in investing as in most things, is not a character trait some people possess and others lack. It is the natural consequence of understanding. The investor who understands deeply why they own a business is not required to exercise special willpower to hold it through periods of market noise. The conviction that the business\u2019s fundamental quality is intact provides the ground beneath the feet during the inevitable periods when the price suggests otherwise.",{noIndent:true}),
  body("That conviction is built through the work this book has described: the foundational analysis, the competitive assessment, the honest evaluation of relevance and longevity, the careful attention to the numbers that reveal whether a business is genuinely strong or merely appearing to be. When that work has been done thoroughly, the result is not merely a position in a portfolio. It is a considered understanding of a specific business in a specific context, held with the confidence that comes from having examined it honestly and found it worthy."),
  body("This kind of conviction does not require external validation. The investor who needs the market to confirm their thesis \u2014 who measures the correctness of their judgment by whether the price is rising \u2014 will find their conviction constantly threatened, because the market will frequently disagree with them in the short term regardless of how correct they ultimately are. The investor who has built conviction through understanding, rather than through the market\u2019s immediate response, is in a different and more stable position. The market\u2019s disagreement is interesting information. It is not the verdict."),

  ornament(),

  wsHead("Observation as the Investor\u2019s Craft"),

  body("The serious investor is, above all else, an observer. Not of prices \u2014 though prices are occasionally useful data \u2014 but of businesses, industries, competitive dynamics, and the world. The investor who walks through a shopping centre and notices which stores are busy and which are empty, who reads the annual reports of companies in industries adjacent to their holdings, who notices when a new competitor appears in a market they own a piece of, who pays attention to the small signals that precede the large ones \u2014 this investor is practising the craft that produces the best investment decisions.",{noIndent:true}),
  body("Observation requires patience. The world does not produce investable conclusions on a schedule. Years may pass between the moment when the observant investor notices something significant and the moment when the market has priced the consequences of it. In the intervening time, the price tells the investor very little. The observation, held quietly, becomes conviction, and the conviction eventually becomes the investment, and the investment eventually produces the return."),
  body("This is the quiet investor\u2019s method: observe patiently, understand deeply, act selectively, hold steadily, exit only when the business has changed. Not a formula, because no formula can account for the complexity of real businesses in real markets. A discipline \u2014 practised consistently, improved iteratively, applied with the calm that comes from having thought through each element carefully before the moment of action arrives."),

  ornament(),

  body("The market rewards not the loudest man, nor the fastest, but the one who understands what he owns and possesses the patience to remain beside it.",{noIndent:true}),
  body("That is the whole of it. Everything in this book has been in service of that sentence. The five foundations give you the tools to understand what you own. The accumulation framework gives you the discipline to build positions at reasonable prices. The exit criteria give you the conditions under which patience is exhausted and action is required. The case studies show what all of it looks like applied to real businesses in real markets."),
  body("The rest is time. Give it generously to the businesses you have selected carefully, and it will return to you something that rushed capital almost never produces: the quiet, compounded, unhurried accumulation of a financial future that is genuinely your own."),

  sp(3), ornament(), sp(2),
  bodyC("Observe. Understand. Be patient.", {italic:true}),
  bodyC("The work is quiet. The results are not.", {italic:true}),
  sp(4),

  new Paragraph({alignment:AlignmentType.CENTER,spacing:{before:200,after:120},children:[new TextRun({text:"\u2014 End of Book 3 \u2014",font,size:18,italics:true,color:"888888",characterSpacing:60})]}),
  sp(2), pb(),

  // ══════════════════════════════════════════════════════════════════════════
  // BONUS MATERIALS
  // ══════════════════════════════════════════════════════════════════════════

  ...partPage("BONUS","Practical Worksheets","Tools for applying the framework to real decisions"),

  body("The worksheets that follow translate the framework from concept into practice. Use them before, during, and after every investment decision. A worksheet completed honestly is worth more than a dozen analyses completed carelessly.",{noIndent:true}),
  sp(1), ornament(), sp(1),

  // ── WORKSHEET 1: SCREENER SETUP ──────────────────────────────────────────

  wsHead("Worksheet 1 \u2014 Screener Setup Checklist"),
  body("Complete this before running any screen on TradingView or another platform. The settings below should be saved as a template and applied consistently.",{noIndent:true}),
  sp(1),

  wsLabel("Platform and Market"),
  field("Platform I am using:", CW), sp(1),
  field("Market / Exchange selected:", CW), sp(1),
  field("Date of screen:", CW), sp(2),

  wsLabel("Core Filters Applied"),
  checkTable([
    "Net Margin: Greater than 0% \u2014 eliminates all loss-making businesses",
    "Net Debt: Less than 0 \u2014 retains only net-cash companies",
    "Market Cap floor set (if applicable) to remove very small or illiquid companies"
  ]),
  sp(1),

  wsLabel("Optional Filters"),
  checkTable([
    "Sector filter applied \u2014 specify: ________________",
    "Industry filter applied \u2014 specify: ________________",
    "Additional filters used \u2014 specify: ________________"
  ]),
  sp(1),

  wsLabel("Columns Configured in Table View"),
  checkTable([
    "Market Cap",
    "Current Price",
    "Price-to-Book (P/B) Ratio",
    "Net Debt",
    "Net Margin (%)",
    "Return on Equity (optional)"
  ]),
  sp(1),

  wsLabel("Sort Order"),
  checkTable(["Table sorted by Net Debt, ascending \u2014 strongest net-cash companies at top"]),
  sp(1),

  wsLabel("Screen Results Summary"),
  field("Total companies in universe before filter:", CW), sp(1),
  field("Companies remaining after core filters:", CW), sp(1),
  field("Companies within P/B accumulation zone (below 4):", CW), sp(1),
  ...prompt("Which sectors appear most frequently in the filtered output?"),
  lines(3, CW),
  sp(1),
  ...prompt("List the three most interesting names from the output for deeper investigation:"),
  lines(3, CW),
  sp(2), ornament(), sp(1),

  // ── WORKSHEET 2: STOCK EVALUATION CHECKLIST ──────────────────────────────

  wsHead("Worksheet 2 \u2014 Stock Evaluation Checklist"),
  body("Complete one worksheet per company under evaluation. This is the bridge between the screener output and an investment decision.",{noIndent:true}),
  sp(1),

  wsLabel("Company Information"),
  field("Company name:", CW), sp(1),
  field("Ticker and Exchange:", CW), sp(1),
  field("Sector / Industry:", CW), sp(1),
  field("Date of evaluation:", CW), sp(2),

  wsLabel("Five Foundations Assessment"),
  sp(1),
  foundationCheckWS(),
  sp(2),

  wsLabel("Key Metrics"),
  field("Current P/B ratio:", CW), sp(1),
  field("Net debt (exact figure from balance sheet):", CW), sp(1),
  field("5-year EPS trend:", CW), sp(1),
  field("Net margin (current year):", CW), sp(1),
  field("Net margin (3 years ago):", CW), sp(2),

  wsLabel("Competitive Position"),
  ...prompt("What is the business\u2019s primary competitive advantage?"),
  lines(3, CW), sp(1),
  ...prompt("Who are the two main competitors, and how does this business compare?"),
  lines(3, CW), sp(2),

  wsLabel("Decision"),
  checkTable([
    "All five foundations pass \u2014 business qualifies for deeper investigation",
    "Accumulation zone confirmed (P/B below 4)",
    "Investment thesis written and documented below"
  ]),
  sp(1),
  ...prompt("In two to three sentences, state the investment thesis:","What specific characteristics make this business worth owning for a decade?"),
  lines(5, CW),
  sp(2), ornament(), sp(1),

  // ── WORKSHEET 3: RELEVANCE REFLECTION ───────────────────────────────────

  wsHead("Worksheet 3 \u2014 Business Relevance Reflection"),
  body("Foundation 4 (Relevance) is the most qualitative of the five. This worksheet provides structure for the thinking it requires.",{noIndent:true}),
  sp(1),

  field("Company:", CW), sp(1),
  field("What specific problem does this business solve?", CW), sp(2),

  wsLabel("The Permanence Test"),
  ...prompt("Will the problem this business solves exist in fifteen years?","Consider technology, demographics, regulation, and substitution."),
  lines(3, CW), sp(1),
  ...prompt("What would have to change about the world for this business to become irrelevant?"),
  lines(3, CW), sp(1),
  ...prompt("Is the demand for what this business provides growing, stable, or shrinking?","Cite any demographic, regulatory, or structural trends that support your answer."),
  lines(3, CW), sp(1),

  wsLabel("Environmental Context"),
  checkTable([
    "This business operates in a developing economy with significant infrastructure deficit",
    "This business serves a need that grows with urbanisation or population growth",
    "This business benefits from a long-term regulatory or structural trend",
    "This business has no near-term technological substitute",
    "This business serves a global need, not merely a local or temporary one"
  ]),
  sp(1),

  wsLabel("Relevance Verdict"),
  field("My assessment of relevance over a 15-year horizon:", CW), sp(1),
  field("The single most important risk to relevance:", CW),
  sp(2), ornament(), sp(1),

  // ── WORKSHEET 4: EXIT-CONDITION CHECKLIST ────────────────────────────────

  wsHead("Worksheet 4 \u2014 Exit-Condition Checklist"),
  body("Complete this at the time of purchase for each holding. Write down the conditions under which you will exit before the price movements and emotions of the market make clear thinking harder.",{noIndent:true}),
  sp(1),

  field("Company:", CW), sp(1),
  field("Entry price and date:", CW), sp(1),
  field("Thesis statement (brief):", CW), sp(2),

  wsLabel("Debt Exit Conditions"),
  checkTable([
    "I will investigate immediately if net debt rises from net cash to a net debt position",
    "I will consider exiting if Net Debt / EBITDA exceeds 3x and is trending higher",
    "I will exit if interest coverage falls below 2x for more than one year"
  ]),
  sp(1),

  wsLabel("Earnings Exit Conditions"),
  checkTable([
    "I will investigate if EPS declines for one consecutive year",
    "I will consider exiting if EPS declines for two consecutive years",
    "I will exit if EPS declines for three or more consecutive years without a clear, temporary explanation",
    "I will consider exiting if gross margin compresses for three or more years"
  ]),
  sp(1),

  wsLabel("Competitive / Structural Exit Conditions"),
  ...prompt("Name one specific event or development that would cause me to re-examine the thesis immediately:","e.g., a major competitor entering the market, a regulatory change, a management departure"),
  lines(3, CW), sp(1),

  wsLabel("What Is NOT an Exit Condition"),
  checkTable([
    "The stock price falling, in isolation, is not an exit condition",
    "Negative media coverage, analyst downgrades, or social media sentiment are not exit conditions",
    "A single bad quarter in an otherwise strong ten-year record is not an exit condition",
    "Other investors selling is not an exit condition"
  ]),
  sp(1),

  wsLabel("My Commitment"),
  body("I have completed this worksheet at the time of purchase. I commit to reviewing these conditions quarterly and applying them to my monitoring of this business, not to my monitoring of the price.",{noIndent:true}),
  sp(1),
  new Table({width:{size:CW,type:WidthType.DXA},columnWidths:[Math.floor(CW/2),CW-Math.floor(CW/2)],rows:[
    new TableRow({children:[
      new TableCell({borders:{top:none,bottom:mid,left:none,right:none},width:{size:Math.floor(CW/2),type:WidthType.DXA},margins:{top:60,bottom:60,left:0,right:160},children:[new Paragraph({children:[new TextRun({text:"",size:bodySize})]})]
      }),
      new TableCell({borders:{top:none,bottom:mid,left:none,right:none},width:{size:CW-Math.floor(CW/2),type:WidthType.DXA},margins:{top:60,bottom:60,left:160,right:0},children:[new Paragraph({children:[new TextRun({text:"",size:bodySize})]})]
      })
    ]}),
    new TableRow({children:[
      new TableCell({borders:{top:none,bottom:none,left:none,right:none},width:{size:Math.floor(CW/2),type:WidthType.DXA},margins:{top:60,bottom:0,left:0,right:160},children:[new Paragraph({children:[new TextRun({text:"Signature",font,size:17,italics:true,color:"AAAAAA"})]})]}),
      new TableCell({borders:{top:none,bottom:none,left:none,right:none},width:{size:CW-Math.floor(CW/2),type:WidthType.DXA},margins:{top:60,bottom:0,left:160,right:0},children:[new Paragraph({children:[new TextRun({text:"Date",font,size:17,italics:true,color:"AAAAAA"})]})]}),
    ]})
  ]}),
  sp(3),

  new Paragraph({alignment:AlignmentType.CENTER,spacing:{before:200,after:120},children:[new TextRun({text:"\u2014 End of Mastering the Stock Market \u2014",font,size:18,italics:true,color:"888888",characterSpacing:60})]}),
  sp(2), pb()
];

// ── BUILD ─────────────────────────────────────────────────────────────────────

const doc = new Document({
  styles:{ default:{ document:{ run:{ font, size: bodySize } } } },
  sections:[{
    properties:{
      page:{ size:{ width:PAGE_W, height:14400 }, margin:{ top:MARGIN, right:MARGIN, bottom:MARGIN, left:MARGIN } }
    },
    children: content
  }]
});

Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync('book3_s9_final_bonus.docx', buf);
  console.log('Done \u2014 saved as book3_s9_final_bonus.docx');
});