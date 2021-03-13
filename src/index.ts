/* eslint-disable @typescript-eslint/ban-ts-comment */
import puppeteer from 'puppeteer'

// const getfirstHalfCards = async () => {
//   const browser = await puppeteer.launch()
//   const page = await browser.newPage()
//   await page.goto('https://www.scorebing.com/league/35')

//   const firstHalfCards = await page.evaluate(() => {
//     const cards = []
//     document.querySelectorAll('ul#race_events.pricing-table > li').forEach((card) => cards.push(card.textContent.replace(/[\n\r]+|[\s]{2,}/g, ' ').trim()))
//     return cards
//   })

//   browser.close()
//   return firstHalfCards
// }

// getfirstHalfCards().then((value) => {
//   console.log(value)
// })

const getAllMatches = async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto('https://www.scorebing.com/league/35')


  const matchesURLAddress = await page.evaluate(() => {
    const links = []
    const matchesLinks = document.querySelectorAll('section#ended > table > tbody > tr > td > div.statusListWrapper > a')
    // @ts-ignore
    matchesLinks.forEach((item) => links.push(item.href))
    return links
  })

  browser.close()
  return matchesURLAddress
}

getAllMatches().then((value) => {
  console.log(value)
})

// pegar urls de todas as partidas das ultimas 10 rodadas e guardar
// acessar uma por uma e pegar a tabela de eventos
