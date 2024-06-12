import React from "react";
import { Link } from "react-router-dom";
import logo from "../logo.png";
import description from "../img/Icon-main.png";
import ring from "../img/icon-ring.png";
import block from "../img/icon-block.png";
import konvensional from "../img/icon-konvensional.png";
import digital from "../img/icon-digital.png";
import about from "../img/icon-about.png";
import kebun from "../img/icon-kebun.png";
import logistik from "../img/icon-logistic.png";
import pabrik from "../img/icon-pabrik.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./home.css";

const Home = () => {
  const nama = "Cassava Super";

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light sticky-top bg-body-tertiary">
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo03"
            aria-controls="navbarTogglerDemo03"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <Link className="navbar-brand" to="#">
            <img
              src={logo}
              style={{ paddingBottom: "10px" }}
              alt="Logo"
              width="30"
              height="40"
              className="d-inline-block align-item-center"
            />
            <strong className="ps-2">Cassava Super</strong>
          </Link>
          <ul
            className="nav justify-content-end navbar-nav collapse navbar-collapse"
            id="navbarTogglerDemo03"
          >
            <li className="nav-item">
              <Link className="nav-link underline" to="#">
                HOME
              </Link>
            </li>
            <li className="nav-item">
              <a className="nav-link underline" href="#about-us">
                ABOUT
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link underline" href="#stakeholder">
                STAKEHOLDER
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link underline" href="#contact-us">
                CONTACT
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link underline" href="/traceability">
                TRACEABILITY
              </a>
            </li>
            <li className="nav-item">
              <Link to="/login" className="nav-link underline">
                LOGIN
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <section className="home-dash">
        <div id="dashboard-dashboard" className="row d-flex align-items-center">
          <div className="col-sm-4">
            <div className="row">
              <h1>
                <strong>
                  Cassava
                  <br />
                  Supper
                </strong>
              </h1>
            </div>
            <div className="row">
              <p>
                Bisnis jual beli mu sangat menguntungkan ayo bergabung disini,
                gratis lho!
              </p>
            </div>
            <div className="row">
              <div className="col-sm">
                <Link to="/login" className="btn btn-outline-danger">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-person-circle"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                    <path
                      fillRule="evenodd"
                      d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                    />
                  </svg>
                  <span style={{ marginLeft: "10px" }}>Log In</span>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <div id="img-icon" className="text-center pb-5">
              <img src={description} alt="Description" className="img-fluid" />
            </div>
          </div>
        </div>
      </section>

      <section id="service">
        <div id="service-service" className="row d-flex align-items-center">
          <div className="col-md-4">
            <div className="row">
              <p>SERVICE</p>
            </div>
            <div className="row">
              <h1>
                <strong>
                  We Provide
                  <br />
                  Awesome
                  <br />
                  Service
                </strong>
              </h1>
            </div>
            <div className="row">
              <p>Servis yang terbaik akan kami berikan kepada anda</p>
            </div>
            <div className="row mb-20">
              <div className="col-2">
                <a href="#block-servise-1">
                  <i className="bi bi-arrow-left-circle" />
                </a>
              </div>
              <div id="panah" className="col-2">
                <a href="#block-servise-4">
                  <i className="bi bi-arrow-right-circle-fill" />
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div
                    className="overflow-auto"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    <div
                      id="block-servise"
                      className="d-inline-block mx-2 text-center"
                    >
                      <div id="block-servise-1" className="row">
                        <div className="col-3" />
                        <div id="img-servise" className="col-6">
                          <img
                            src={ring}
                            className="img-fluid"
                            style={{ maxWidth: "60%" }}
                          />
                        </div>
                        <div className="col-3" />
                      </div>
                      <div className="row">
                        <p>
                          RANTAI
                          <br />
                          PASOK
                        </p>
                      </div>
                      <div id="i-service" className="row">
                        <a href="#block-servise-2">
                          <i className="bi bi-arrow-right-circle-fill" />
                        </a>
                      </div>
                    </div>
                    <div
                      id="block-servise"
                      className="d-inline-block mx-2 text-center"
                    >
                      <div id="block-servise-2" className="row">
                        <div className="col-3" />
                        <div id="img-servise" className="col-6">
                          <img
                            src={block}
                            alt=""
                            className="img-fluid"
                            style={{ maxWidth: "60%" }}
                          />
                        </div>
                        <div className="col-3" />
                      </div>
                      <div className="row">
                        <p>
                          TEKNOLOGI
                          <br />
                          BLOCKCAHIN
                        </p>
                      </div>
                      <div id="i-service" className="row">
                        <a href="#block-servise-3">
                          <i className="bi bi-arrow-right-circle-fill" />
                        </a>
                      </div>
                    </div>
                    <div
                      id="block-servise"
                      className="d-inline-block mx-2 text-center"
                    >
                      <div id="block-servise-3" className="row">
                        <div className="col-3" />
                        <div id="img-servise" className="col-6">
                          <img
                            src={konvensional}
                            alt=""
                            className="img-fluid"
                            style={{ maxWidth: "60%" }}
                          />
                        </div>
                        <div className="col-3" />
                      </div>
                      <div className="row">
                        <p>
                          METODE
                          <br />
                          KONVENSIONAL
                        </p>
                      </div>
                      <div id="i-service" className="row">
                        <a href="#block-servise-4">
                          <i className="bi bi-arrow-right-circle-fill" />
                        </a>
                      </div>
                    </div>
                    <div
                      id="block-servise"
                      className="d-inline-block mx-2 text-center"
                    >
                      <div id="block-servise-4" className="row">
                        <div className="col-3" />
                        <div id="img-servise" className="col-6">
                          <img
                            src={digital}
                            alt=""
                            className="img-fluid"
                            style={{ maxWidth: "60%" }}
                          />
                        </div>
                        <div className="col-3" />
                      </div>
                      <div className="row">
                        <p>
                          METODE
                          <br />
                          DIGITAL
                        </p>
                      </div>
                      <div id="i-service" className="row">
                        <a href="#block-servise-4">
                          <i className="bi bi-arrow-right-circle-fill" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="CPO">
        <div id="CPO-CPO" className="row ">
          <div className="row">
            <h2>
              <b>Tracing produk anda?</b>
            </h2>
          </div>
          <div className="row">
            <p>Silahkan mengklik dibawah ini</p>
          </div>
          <div className="row">
            <div className="col-md">
              <a href="/traceability" className="btn btn-outline-light">
                Trace Produk Anda
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="about-us">
        <div id="stake-holder" className="row">
          <div>
            <h2 className="text-center pb-3">
              <strong>About Us</strong>
            </h2>
          </div>
          <div className="row text-center">
            <p>
              Cassava Supper adalah sebuah platfrom aplikasi yang memiliki fokus
              pada pengelolaan rantai pasok yang mencakup, pasokan singkong,
              transportasi, pemrosesan utama dan lebih lanjut berbasis konsep
              Blockchain.
            </p>
          </div>
          <div id="about-image-text" className="row">
            <div className="col-md" style={{ position: "relative" }}>
              <img src={about} alt="" />
              <div id="about-text" className="col-md">
                <p>OUR STORY</p>
                <h3>
                  <b>
                    Something
                    <br />
                    Now
                    <br />
                    About
                    <br />
                    Us.
                  </b>
                </h3>
              </div>
            </div>
            <div id="information-text" className="col">
              <div className="row">
                <h2>
                  <strong>Information</strong>
                </h2>
              </div>
              <div
                id="description-info"
                className="row"
                style={{ textAlign: "justify" }}
              >
                <p>
                  Cassava Super dibuat karna keresahan masyarakat karena
                  sulitnya mendata proses transfer komoditas singkong, dari hulu
                  hingga hilir. Maka terciptalah Cassava sebagai solusi untuk
                  membangun sistem ketelusuran produk singkong yang
                  berkelanjutan serta untuk meningkatkan efektifitas proses
                  transfer komoditas singkong yang dapat dikembangkan secara
                  Real-Time.
                </p>
                <p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-check2-circle"
                    className="icon"
                    viewBox="0 0 16 16"
                  >
                    <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0" />
                    <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z" />
                  </svg>{" "}
                  Visibilitas dalam transfer bahan pasokan <br />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-check2-circle"
                    className="icon"
                    viewBox="0 0 16 16"
                  >
                    <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0" />
                    <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z" />
                  </svg>{" "}
                  Transparansi dalam hasil produksi singkong <br />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-check2-circle"
                    className="icon"
                    viewBox="0 0 16 16"
                  >
                    <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0" />
                    <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z" />
                  </svg>{" "}
                  Traceability dalam menulusuri produksi singkong anda
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="data">
        <div id="data-data" className="row">
          <div id="data-content">
            <div className="col text-center" id="box-data">
              <h1>
                <strong>10</strong>
              </h1>
            </div>
            <div id="data-text" className="col">
              <h3 className="text-center">
                DATA
                <br />
                APPROVED
              </h3>
            </div>
          </div>
          <div id="data-content" className="">
            <div className="col text-center" id="box-data">
              <h1>
                <strong>2</strong>
              </h1>
            </div>
            <div id="data-text" className="col">
              <h3 className="text-center">
                DATA
                <br />
                ON PROCESS
              </h3>
            </div>
          </div>
          <div id="data-content" className="">
            <div className="col text-center" id="box-data">
              <h1>
                <strong>12</strong>
              </h1>
            </div>
            <div id="data-text" className="col">
              <h3 className="text-center">
                DATA
                <br />
                TOTAL
              </h3>
            </div>
          </div>
          <div id="data-content" className="">
            <div className="col text-center" id="box-data">
              <h1>
                <strong>24</strong>
              </h1>
            </div>
            <div id="data-text" className="col">
              <h3 className="text-center">
                DATA
                <br />
                VIEWS
              </h3>
            </div>
          </div>
        </div>
      </section>

      <section id="stakeholder">
        <div id="stake-holder" className="row">
          <div>
            <h2 className="text-center pb-3">
              <strong id="stakeholders">Stakeholder</strong>
            </h2>
          </div>
          <div className="row text-center">
            <div className="col-md">
              <div className="row justify-content-center">
                <div className="icon-stakeholder">
                  <img src={kebun} alt="" className="img-fluid" />
                </div>
              </div>
              <div className="text-stakeholder">
                <h3>
                  <strong>Petani</strong>
                </h3>
              </div>
              <div className="p-stakeholder">
                <p>
                  Stakeholder petani bagian pertama dalam proses ketertelusuran
                  bahan baku singkong. Mulai dari memanen Singkong hingga
                  mengirim produk tersebut ke stakeholder logistik
                </p>
              </div>
            </div>
            <div className="col-md">
              <div className="row justify-content-center">
                <div className="icon-stakeholder">
                  <img src={logistik} alt="" className="img-fluid" />
                </div>
              </div>
              <div className="text-stakeholder">
                <h3>
                  <strong>Logistik</strong>
                </h3>
              </div>
              <div className="p-stakeholder">
                <p>
                  Stakeholder logistik menjadi garda terdepan untuk mengirimkan
                  produk singkong ke pabrik untuk diolah.
                </p>
              </div>
            </div>
            <div className="col-md">
              <div className="row justify-content-center">
                <div className="icon-stakeholder">
                  <img src={pabrik} alt="" className="img-fluid" />
                </div>
              </div>
              <div className="text-stakeholder">
                <h3>
                  <strong>Pabrik</strong>
                </h3>
              </div>
              <div className="p-stakeholder">
                <p>
                  Stakeholder pabrik mengolah singkong melalui beberapa station
                  pemeriksaan kualitas singkong, termasuk kebersihan,
                  kematangan, ketidakcacatan, dan lain lain.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="faq">
        <div>
          <h2 className="text-center pb-3">
            <strong id="stakeholders">Frequently Asked Question</strong>
          </h2>
        </div>
        <div className="accordion accordion-flush" id="accordionFlushExample">
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseOne"
                aria-expanded="false"
                aria-controls="flush-collapseOne"
              >
                <b>
                  Ingin menggunakan jasa Cassava Super untuk perusahaan anda?
                </b>
              </button>
            </h2>
            <div
              id="flush-collapseOne"
              className="accordion-collapse collapse"
              data-bs-parent="#accordionFlushExample"
            >
              <div className="accordion-body">
                <p>
                  Hubungi kontak yang tersedia untuk menggunakan jasa Cassava
                  Super untuk implementasi web apps pada perusahaan anda
                </p>
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseTwo"
                aria-expanded="false"
                aria-controls="flush-collapseTwo"
              >
                <b>Cara tracing produk Anda?</b>
              </button>
            </h2>
            <div
              id="flush-collapseTwo"
              className="accordion-collapse collapse"
              data-bs-parent="#accordionFlushExample"
            >
              <div className="accordion-body">
                <p>
                  Masukan kode prduk anda, kemudian akan muncul data
                  traceability anda
                </p>
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header"></h2>
          </div>
        </div>
      </section>

      <section id="contact-us">
        <div id="contact-contact">
          <h2 className="text-center pb-3">
            <strong id="ContactUs">Contact Us</strong>
          </h2>
          <div className="row">
            <div style={{ marginBottom: 15 }} className="col-md-6">
              <div className="container-fluid">
                <div className="row">
                  <div id="info" className="col-md text-center">
                    <div className="d-inline-block">
                      <h2>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="30"
                          height="30"
                          fill="currentColor"
                          class="bi bi-geo-alt-fill"
                          className="icon"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
                        </svg>
                      </h2>
                      <h3>
                        <strong>Address</strong>
                      </h3>
                      <p>
                        Jl. Prof. Dr. Sumantri Brojonegoro No. 1 Bandar Lampung,
                        Lampung 35145, Indonesia.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div id="info" className="col-md text-center">
                    <div className="d-inline-block">
                      <h2>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="30"
                          height="30"
                          fill="currentColor"
                          class="bi bi-envelope"
                          className="icon"
                          viewBox="0 0 16 16"
                        >
                          <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z" />
                        </svg>
                      </h2>
                      <h3>
                        <strong>Email</strong>
                      </h3>
                      <p>ardian.ulvan@eng.unila.ac.id</p>
                    </div>
                  </div>
                  <div id="info" className="col-md text-center">
                    <div className="d-inline-block">
                      <h2>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="30"
                          height="30"
                          fill="currentColor"
                          class="bi bi-telephone"
                          className="icon"
                          viewBox="0 0 16 16"
                        >
                          <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z" />
                        </svg>
                      </h2>
                      <h3>
                        <strong>Call</strong>
                      </h3>
                      <p>+62 853 8185 5404</p>
                    </div>
                  </div>
                  <div style={{ paddingBottom: 5 }} />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <form action="#">
                <div className="input-box">
                  <div className="row">
                    <div id="name" className="col-md-6">
                      <div className="mb-3">
                        <input
                          type="name"
                          className="form-control"
                          id="exampleFormControlInput1"
                          placeholder="Your Name"
                          autoComplete="off"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <input
                          type="email"
                          className="form-control"
                          id="exampleFormControlInput1"
                          placeholder="Your Email"
                          autoComplete="off"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="mb-3">
                        <input
                          type="email"
                          className="form-control"
                          id="exampleFormControlInput1"
                          placeholder="Subject"
                          autoComplete="off"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <textarea
                      style={{ height: 200 }}
                      className="form-control"
                      id="exampleFormControlTextarea1"
                      rows={3}
                      placeholder="Message"
                      defaultValue={""}
                    />
                  </div>
                </div>
                <div className="text-center">
                  <button
                    style={{ marginBottom: 20 }}
                    className="btn btn-danger"
                    type="button"
                  >
                    {" "}
                    <a
                      href="mailto:ricoprediansyah@gmail.com"
                      style={{ color: "white", textDecoration: "none" }}
                    >
                      Send Message
                    </a>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section id="footer-bottom">
        © Copyright <b>TELTI-PROJECT</b>
      </section>
    </div>
  );
};

export default Home;
