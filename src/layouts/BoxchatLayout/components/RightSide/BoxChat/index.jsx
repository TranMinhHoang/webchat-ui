/* eslint-disable array-callback-return */
import SockJsClient from 'react-stomp';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClose,
  faEllipsisVertical,
  faFaceSmile,
  faImage,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import Avatar from 'react-avatar';
import HeadlessTippy from '@tippyjs/react/headless';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import styles from './BoxChat.module.scss';
import { faSquarePlus } from '@fortawesome/free-regular-svg-icons';

const cx = classNames.bind(styles);

const handleFileChosen = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      // const data = reader.result;
      resolve(reader.result);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

function BoxChat({
  user: userFriend,
  state,
  setState,
  listUserOnline,
  listImages,
  setListImages,
}) {
  var currentdate = new Date();
  var datetime =
    ('0' + currentdate.getDate()).slice(-2) +
    '/' +
    ('0' + (currentdate.getMonth() + 1)).slice(-2) +
    ' ' +
    ('0' + currentdate.getHours()).slice(-2) +
    ':' +
    ('0' + currentdate.getMinutes()).slice(-2);

  const messageEndRef = useRef();
  const clientRef = useRef();
  const inputRef = useRef();
  const inputImageRef = useRef();
  const imageRef = useRef();
  const user = useSelector((state) => state.auth.login?.currentUser);
  const [isEmojiBox, setIsEmojiBox] = useState(false);

  const scrollToBottom = () => {
    messageEndRef.current.scrollIntoView({
      block: 'end',
      behavior: 'smooth',
    });
  };

  const sendMessage = () => {
    if (inputRef.current.value !== '' || listImages.length !== 0) {
      clientRef.current.sendMessage(
        '/app/user-all',
        JSON.stringify({
          from: state.from,
          to: state.to,
          message: state.typedMessage,
          time: datetime,
          images: listImages,
        }),
      );

      setState((prev) => ({ ...prev, typedMessage: '' }));
      setListImages([]);
      inputRef.current.focus();
    } else inputRef.current.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  const handleChangeInput = (e) => {
    setState((prev) => ({
      ...prev,
      typedMessage: e.target.value,
    }));
  };

  const handleSelectEmoji = (e) => {
    setState((prev) => ({
      ...prev,
      typedMessage: state.typedMessage + e.native,
    }));
    inputRef.current.focus();
  };

  const handleEmojiBox = () => {
    setIsEmojiBox(!isEmojiBox);
  };

  const displayMessages = () => {
    return (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          overflowY: 'scroll',
          flexDirection: 'column-reverse',
          padding: '50px 50px 20px 50px',
        }}
      >
        <div ref={messageEndRef} style={{ height: '10px' }} />
        {!!Object.keys(state.messages).length &&
          !!state?.messages?.[userFriend.id]?.length &&
          [...state?.messages?.[userFriend.id]]
            ?.reverse()
            ?.map((msg, index) => {
              return (
                <div key={index} style={{ marginBottom: '6px' }}>
                  {Number(state.from) === Number(msg.from) ? (
                    <div className={cx('message', 'my_message')}>
                      <Tippy
                        content={
                          <span
                            style={{
                              fontSize: '1.2rem',
                            }}
                          >
                            {msg.time}
                          </span>
                        }
                        placement="left"
                        delay={[300, 0]}
                      >
                        <div className={cx('message-content')}>
                          {msg.message !== '' && (
                            <div className={cx('message-text')}>
                              <p>{msg.message}</p>
                            </div>
                          )}
                          {msg.images?.map((img) => {
                            return (
                              <img
                                key={img.id}
                                className={cx('message-img')}
                                src={img.url}
                                alt=""
                              />
                            );
                          })}
                        </div>
                      </Tippy>
                    </div>
                  ) : (
                    <>
                      {user.id === Number(msg.to) && (
                        <div className={cx('message', 'frnd_message')}>
                          <Tippy
                            content={
                              <span
                                style={{
                                  fontSize: '1.2rem',
                                }}
                              >
                                {msg.time}
                              </span>
                            }
                            placement="right"
                            delay={[300, 0]}
                          >
                            <div className={cx('message-content')}>
                              {msg.message !== '' && (
                                <div className={cx('message-text')}>
                                  <p>{msg.message}</p>
                                </div>
                              )}
                              {msg.images?.map((img) => {
                                return (
                                  <img
                                    key={img.id}
                                    className={cx('message-img')}
                                    src={img.url}
                                    alt=""
                                  />
                                );
                              })}
                            </div>
                          </Tippy>
                        </div>
                      )}
                    </>
                  )}
                </div>
              );
            })}
      </div>
    );
  };

  //   useEffect(() => {
  //     if (
  //       state?.messages?.[userFriend.id]?.length !==
  //       JSON.parse(localStorage.getItem('messages'))?.[userFriend.id]?.length
  //     ) {
  //       scrollToBottom();
  //     }
  //   }, [state?.messages?.[userFriend.id]?.length]);

  useEffect(() => {
    scrollToBottom();
  });

  useEffect(() => {
    setState((prev) => ({
      ...prev,
      from: user?.id,
      to: userFriend.id,
    }));
  }, [userFriend]);

  return (
    <>
      <div className={cx('header')}>
        <div className={cx('imgtext')}>
          <div className={cx('userimg')}>
            <Avatar
              className={cx('cover')}
              name={userFriend.fullname}
              size="40"
            />
          </div>

          <h4>
            {userFriend.fullname}
            <br />
            {listUserOnline[userFriend.id]?.status ? (
              <span className={cx('online')}>Online</span>
            ) : (
              <span className={cx('offline')}>Offline</span>
            )}
          </h4>
        </div>
        <ul className={cx('nav-icon')}>
          <li>
            <FontAwesomeIcon className={cx('icon')} icon={faSearch} />
          </li>
          <li>
            <FontAwesomeIcon className={cx('icon')} icon={faEllipsisVertical} />
          </li>
        </ul>
      </div>
      <div
        className={cx('chatbox')}
        style={listImages.length > 0 ? { height: 'calc(100% - 190px)' } : {}}
      >
        {displayMessages()}

        <SockJsClient
          url="http://localhost:8080/websocket-chat/"
          topics={['/topic/user']}
          onMessage={() => {}}
          ref={clientRef}
        />
      </div>

      <div
        className={cx('footer')}
        style={
          listImages.length > 0
            ? {
                height: '130px',
                padding: '10px 0',
                alignItems: 'end',
              }
            : {}
        }
      >
        <div>
          <HeadlessTippy
            interactive
            visible={isEmojiBox}
            placement="top-start"
            render={(attrs) => (
              <div tabIndex="-1" {...attrs}>
                <Picker data={data} onEmojiSelect={handleSelectEmoji} />
              </div>
            )}
            onClickOutside={handleEmojiBox}
          >
            <div onClick={handleEmojiBox}>
              <FontAwesomeIcon className={cx('icon')} icon={faFaceSmile} />
            </div>
          </HeadlessTippy>
        </div>

        {/* input file */}
        <input
          ref={inputImageRef}
          type="file"
          style={{ display: 'none' }}
          multiple
          accept="image/*"
          onChange={async (event) => {
            const files = [...event.target.files];
            const results = await Promise.all(
              Array.from(files, async (file) => {
                const fileContents = await handleFileChosen(file);
                let result = {
                  id: crypto.randomUUID(),
                  url: fileContents,
                  name: file.name,
                  size: file.size,
                  type: file.type,
                  createdAt: new Date(),
                };

                return result;
              }),
            );
            const newImages = [...listImages];
            results.forEach((result) => {
              newImages.push(result);
            });
            setListImages(newImages);
          }}
        />

        <div
          onClick={() => {
            inputImageRef?.current?.click();
          }}
        >
          <FontAwesomeIcon className={cx('icon')} icon={faImage} />
        </div>

        {/* list-img */}
        {listImages.length > 0 ? (
          <div className={cx('wrapper_input-imgs')}>
            <div className={cx('list-imgs')}>
              <div
                className={cx('wrapper_add-img')}
                onClick={() => {
                  inputImageRef?.current?.click();
                }}
              >
                <FontAwesomeIcon
                  className={cx('add-img')}
                  icon={faSquarePlus}
                />
              </div>
              {listImages?.map((img, index) => (
                <div key={index} style={{ position: 'relative' }}>
                  <img
                    ref={imageRef}
                    className={cx('img-item')}
                    src={img.url}
                    alt=""
                  />
                  <div
                    className={cx('wrapper_delete-img')}
                    onClick={() => {
                      const newImages = listImages.filter(
                        (image) => img.id !== image.id,
                      );
                      setListImages(newImages);
                    }}
                  >
                    <FontAwesomeIcon
                      className={cx('delete-img')}
                      icon={faClose}
                    />
                  </div>
                </div>
              ))}
            </div>
            <input
              className={cx('text-input')}
              style={{
                borderTopLeftRadius: '0',
                borderTopRightRadius: '0',
              }}
              ref={inputRef}
              value={state.typedMessage}
              type="text"
              placeholder="Soạn tin nhắn"
              onChange={handleChangeInput}
              onKeyDown={handleKeyDown}
            />
          </div>
        ) : (
          <input
            className={cx('text-input')}
            ref={inputRef}
            value={state.typedMessage}
            type="text"
            placeholder="Soạn tin nhắn"
            onChange={handleChangeInput}
            onKeyDown={handleKeyDown}
          />
        )}

        <svg className={cx('send')} viewBox="0 0 24 30" onClick={sendMessage}>
          <path d="M16.6915026,12.4744748 L3.50612381,13.2599618 C3.19218622,13.2599618 3.03521743,13.4170592 3.03521743,13.5741566 L1.15159189,20.0151496 C0.8376543,20.8006365 0.99,21.89 1.77946707,22.52 C2.41,22.99 3.50612381,23.1 4.13399899,22.8429026 L21.714504,14.0454487 C22.6563168,13.5741566 23.1272231,12.6315722 22.9702544,11.6889879 C22.8132856,11.0605983 22.3423792,10.4322088 21.714504,10.118014 L4.13399899,1.16346272 C3.34915502,0.9 2.40734225,1.00636533 1.77946707,1.4776575 C0.994623095,2.10604706 0.8376543,3.0486314 1.15159189,3.99121575 L3.03521743,10.4322088 C3.03521743,10.5893061 3.34915502,10.7464035 3.50612381,10.7464035 L16.6915026,11.5318905 C16.6915026,11.5318905 17.1624089,11.5318905 17.1624089,12.0031827 C17.1624089,12.4744748 16.6915026,12.4744748 16.6915026,12.4744748 Z"></path>
        </svg>
      </div>
    </>
  );
}

export default BoxChat;
