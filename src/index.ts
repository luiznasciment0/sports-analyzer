/* eslint-disable @typescript-eslint/ban-ts-comment */
import puppeteer from 'puppeteer'

const getLastRoundMatches = async (leagueUrlAddress = 'https://www.scorebing.com/league/35') => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(leagueUrlAddress)

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

const getMatchEvents = async (matchUrlAddress = 'https://www.scorebing.com/match_live/827460') => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(matchUrlAddress)

  const events = await page.evaluate(() => {
    const cards = []
    document.querySelectorAll('ul#race_events.pricing-table > li').forEach((card) => cards.push(card.textContent.replace(/[\n\r]+|[\s]{2,}/g, ' ').trim()))
    return cards
  })

  browser.close()
  return events
}

const lastRoundEvents = async () => {
  const last10Matches = await getLastRoundMatches('https://www.scorebing.com/league/35')
  last10Matches.forEach(async (match) => {
    await getMatchEvents(match)
  })
  console.log(last10Matches)
  return
}

console.log(lastRoundEvents())
// pegar urls de todas as partidas das ultimas 10 rodadas e guardar
// acessar uma por uma e pegar a tabela de eventos
