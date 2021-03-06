import React, {FC, useState} from 'react';
import axios from 'axios';
import Button from 'antd/es/button';
import Col from 'antd/es/col';
import Card from 'antd/es/card';
import Divider from 'antd/es/divider';

import Form from 'antd/es/form';
import Image from 'antd/es/image';
import Input from 'antd/es/input';
import Radio from 'antd/es/radio';
import Row from 'antd/es/row';
import Typography from 'antd/es/typography';
import ReCAPTCHA from 'react-google-recaptcha';

import tweet_webp from 'assets/FaucetSteps/tweet.webp';
import tweet_png from 'assets/FaucetSteps/tweet.png';
import step2_webp from 'assets/FaucetSteps/step2.webp';
import step2_png from 'assets/FaucetSteps/step2.png';
import step3_webp from 'assets/FaucetSteps/step3.webp';
import step3_png from 'assets/FaucetSteps/step3.png';
// import step4_webp from 'assets/FaucetSteps/step4.webp';
import step4_png from 'assets/FaucetSteps/step4.png';
import {A, PageContentsLayout} from 'components';
import {TESTNET_BANK_URL} from 'constants/url';
import {RE_CAPTCHA_SITE_KEY} from 'constants/key';

interface StepProps {
  src: string;
  fallback: string;
  alt: string;
  title: string;
  description?: string;
}

const Step: FC<StepProps> = ({src, fallback, alt, title, description, children}) => (
  <Row justify="center" style={{width: '300px'}}>
    <Col span={24}>
      <Image src={src} fallback={fallback} alt={alt} />
    </Col>
    <Col>
      <Typography.Title level={4}>{title}</Typography.Title>
    </Col>
    <Col style={{textAlign: 'center'}}>{children}</Col>
  </Row>
);

interface FaucetRequest {
  amount: 100 | 500 | 1500;
  url: string;
}

const TestnetFaucet = () => {
  const [form] = Form.useForm();
  const requiredMark = false;
  const [urlValidateStatus, setUrlValidateStatus] = useState('');

  const recaptchaRef: any = React.createRef<HTMLInputElement>();

  const faucetRequest = async ({amount, url}: FaucetRequest) => {
    const token = await recaptchaRef.current.executeAsync();

    console.log(token);
    console.log({amount, url});

    const faucetResponse = await axios.post(`${TESTNET_BANK_URL}/faucet`, {
      amount,
      csrfmiddlewaretoken: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI',
      url,
      'g-recaptcha-response': token,
    });

    console.log({faucetResponse});
  };

  return (
    <PageContentsLayout>
      <ReCAPTCHA
        badge="bottomright"
        ref={recaptchaRef}
        size="invisible"
        sitekey={'6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'}
      />

      {/* Testnet Faucet Form */}
      <Col span={24}>
        <Card>
          <Row align="middle" justify="space-around" gutter={[30, 30]}>
            <Col xs={23} sm={20} md={16} lg={13} xl={12}>
              <Typography.Title level={4}> Get Coins to test on the Testnet</Typography.Title>
              <Form
                form={form}
                layout="vertical"
                initialValues={{requiredMarkValue: requiredMark}}
                requiredMark={requiredMark}
                onFinish={faucetRequest}
                onFinishFailed={() => setUrlValidateStatus('error')}
              >
                <Form.Item label="Amount" name="amount" initialValue={100}>
                  <Radio.Group>
                    <Radio.Button value={100}>100 coins / 3 hrs</Radio.Button>
                    <Radio.Button value={500}>500 coins / day</Radio.Button>
                    <Radio.Button value={1500}>1500 coins / 3 days</Radio.Button>
                  </Radio.Group>
                </Form.Item>
                <Form.Item
                  label="Post Url"
                  name="url"
                  required
                  // tooltip="This is a required field"
                  rules={[
                    {required: true, message: 'This field is required'},
                    {type: 'url', message: 'Pleases enter a valid Url'},
                  ]}
                >
                  <Input placeholder="URL of post containing your TNB address..." />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Collect Coins
                  </Button>
                </Form.Item>
              </Form>
            </Col>
            <Col xs={23} sm={20} md={16} lg={10}>
              <Typography.Title level={5}>
                Testnet Bank:{' '}
                <Typography.Link href={TESTNET_BANK_URL}> {TESTNET_BANK_URL.slice(7, -1)}</Typography.Link>
              </Typography.Title>
              <Typography.Text>
                To connect to the TNB Testnet network set the Testnet Bank as your{' '}
                <Typography.Text strong>active bank</Typography.Text>
              </Typography.Text>
              <br />
              <br />
              <Typography.Text mark>
                To prevent a single account from accumulating all the coins, requests are made using a public facebook
                or twitter account.
              </Typography.Text>
            </Col>
          </Row>
        </Card>
      </Col>

      {/* How to  */}
      <Col span={24}>
        <Card>
          <Row justify="space-around" gutter={[30, 30]}>
            <Col span={24}>
              <Typography.Title style={{textAlign: 'center'}} level={3}>
                How to request for testnet coins?
              </Typography.Title>
            </Col>

            <Col>
              <Step src={tweet_webp} fallback={tweet_png} alt="example tweet" title="1. Post on Social Media">
                Create a post on Facebook or a tweet on Twitter
                <br />
                Mention #TNBFaucet and thenewboston address
              </Step>
            </Col>
            <Col>
              <Step src={step2_webp} fallback={step2_png} alt="Step 2 img" title="2. Copy Post URL">
                Make sure the Post is Public
                <br />
                Copy the complete URL of the post
              </Step>
            </Col>

            <Col>
              <Step src={step3_webp} fallback={step3_png} alt="Step 3 img" title="3. Open TNB Faucet & Paste URL">
                Paste the URL
                <br />
                Select the Number of coins you want
                <br />
                Click on Collect coins
              </Step>
            </Col>
            <Col>
              <Step src={step4_png} fallback={step4_png} alt="Step 4 img" title="4. Connect to TNB Testnet">
                Open the Account Manager / TNB Wallet
                <br />
                Use <A href={TESTNET_BANK_URL}>{TESTNET_BANK_URL.slice(7, -1)} </A>
                as your active bank
                <br />
                Build great apps for the mainnet without the fear of burning coins!
              </Step>
            </Col>
          </Row>
        </Card>
      </Col>
    </PageContentsLayout>
  );
};

export default TestnetFaucet;
