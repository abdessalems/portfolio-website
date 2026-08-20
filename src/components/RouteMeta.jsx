import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SITE = 'https://www.saadaoui.it.com';

/*
 * The site is one HTML file serving several routes, so anything a crawler
 * reads out of <head> is whatever index.html shipped with — the same title,
 * the same description and no canonical, on every URL. Googlebot renders the
 * page before it indexes it, so setting the head per route here is what gives
 * each route its own entry in search results instead of a duplicate of Home.
 */
const ROUTES = {
  '/': {
    title: 'Abdessalem Saadaoui — Functional Analyst & Java Developer',
    description:
      'Functional Analyst in Brussels with 4+ years bridging business and IT: requirements engineering, UML/BPMN process modelling, Swagger/OpenAPI contracts, Java Spring Boot and Angular.',
  },
  '/boxing': {
    title: 'Muay Thai & Kickboxing Career — Abdessalem Saadaoui',
    description:
      'WFM World Champion (Türkiye, 2017), ISKA African Titleholder (2016) and 5× Tunisian National Champion: 25 professional fights across Thailand, Malaysia, Côte d’Ivoire and the Gulf.',
  },
};

const NOT_FOUND = {
  title: 'Page not found — Abdessalem Saadaoui',
  description: 'This page does not exist. Head back to the homepage to keep looking.',
  noindex: true,
};

/** Create the tag if it is missing, then set the attribute we care about. */
function setTag(selector, create, attribute, value) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  el.setAttribute(attribute, value);
  return el;
}

function meta(name, content) {
  setTag(`meta[name="${name}"]`, () => {
    const el = document.createElement('meta');
    el.setAttribute('name', name);
    return el;
  }, 'content', content);
}

function property(name, content) {
  setTag(`meta[property="${name}"]`, () => {
    const el = document.createElement('meta');
    el.setAttribute('property', name);
    return el;
  }, 'content', content);
}

export default function RouteMeta() {
  const { pathname } = useLocation();

  useEffect(() => {
    // `/boxing/` and `/boxing` are the same page. Normalising here keeps the
    // canonical single-valued, so the two spellings cannot compete.
    const route = pathname.replace(/\/+$/, '') || '/';
    const page = ROUTES[route] ?? NOT_FOUND;
    const url = `${SITE}${route === '/' ? '/' : route}`;

    document.title = page.title;
    meta('description', page.description);
    meta('robots', page.noindex ? 'noindex, follow' : 'index, follow');

    setTag('link[rel="canonical"]', () => {
      const el = document.createElement('link');
      el.setAttribute('rel', 'canonical');
      return el;
    }, 'href', url);

    property('og:title', page.title);
    property('og:description', page.description);
    property('og:url', url);
    meta('twitter:title', page.title);
    meta('twitter:description', page.description);
  }, [pathname]);

  return null;
}
