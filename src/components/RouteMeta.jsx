import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import RouteMetaData from '../data/RouteMetaData.json';

const SITE = 'https://www.saadaoui.it.com';

/*
 * Keeps the head correct while the visitor moves between routes.
 *
 * Each route is also served its own prerendered HTML, so a crawler already
 * receives the right tags — but that file is only fetched on a full page load.
 * A client-side navigation from / to /boxing changes no HTML, so without this
 * the address bar would say /boxing while the head still described the
 * homepage. Both read the same JSON, so they cannot drift apart.
 */
const { routes: ROUTES, notFound: NOT_FOUND } = RouteMetaData;

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
