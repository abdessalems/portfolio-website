import React from 'react';
import { Link } from 'react-router-dom';

/*
 * Reached two ways: a bad link followed inside the app, and — through the
 * 404 rule in vercel.json — nothing else, because a request for an unknown URL
 * is answered by the static 404.html with a real 404 status before React ever
 * loads. Both paths need to say the same thing.
 */
export default function NotFound() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-heading text-center">
          <h6>
            <span>404</span>
          </h6>
          <h2>This page doesn’t exist</h2>
        </div>
        <p className="text-center">
          The address may be mistyped, or the page may have moved. Everything is
          reachable from the homepage.
        </p>
        <div className="text-center mt-4 d-flex gap-3 justify-content-center flex-wrap">
          <Link to="/" className="px-btn">
            Back to homepage
          </Link>
          <a href="/fa/" className="px-btn">
            Analyst workspace
          </a>
        </div>
      </div>
    </section>
  );
}
